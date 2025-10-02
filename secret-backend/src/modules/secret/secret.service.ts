import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSecretDto } from './dto/create-secret.dto';
import { CryptoService } from '../crypto/crypto.service';
import { PgService } from '../pg/pg.service';
import { CreateSecretResponse } from './interfaces/response-create-secret.interface';
import { GetSecretResponse } from './interfaces/response-get-secret.interface';
import { IdResponse } from './interfaces/id-response.interface';
import { SecretEntry } from '../pg/interfaces/secret-entry.interface';

/**
 * Сервис модуля secret.module для обработки запросов по маршрутам для записи, удаления, получения секретных фраз,
 * использует методы из других модулей
 * */
@Injectable()
export class SecretService {
  constructor(
    @Inject(CryptoService) private cryptoService: CryptoService,
    @Inject(PgService) private pgService: PgService,
  ) {}

  /**
   * Получает объект с такими полями:
   * 1 - секретной фразой
   * 2 - временем, через сколько миллисекунд она должна истечь
   * 3 - допустимым числом просмотров для этой фразы
   * 4 - а также полем, показывающим, могут ли пользователи с клиента удалить фразу сами, до ее истечения
   * Зашифровывает секретную фразу с помощью функции из другого модуля, затем записывает информацию про нее в базу данных.
   * Информация берется из тела запроса, а также iv вычисляется во время работы функции.
   *
   *@param {CreateSecret} secretDto - объект, описанный выше
   *@throws HttpException c кодом 500, если возникли неполадки во время шифрования фразы или записи в базу данных
   *@returns Promise<CreateSecretResponse> - объект с полем id, которое случайным образом генерирует Postgres, и потом оно будет использовано
   * в качестве ссылки для доступа к секретной фразы, а также с полями, аналогичными полям 1, 2, 3, указанным выше.
   * Только поле 2 она возвращает в виде строки, с датой, когда секретная фраза истекает.
   * */
  async setSecretPhrase(
    secretDto: CreateSecretDto,
  ): Promise<CreateSecretResponse> {
    const { secretPhrase, availableViews, expiresInTimestamp, allowDeletions } =
      secretDto;

    const { encryptedTextBase64, ivBase64 } =
      await this.cryptoService.encryptSecretPhrase(secretPhrase);

    const expiresAt = new Date(Date.now() + expiresInTimestamp);

    const insertValues = {
      encrypted_value: encryptedTextBase64,
      iv: ivBase64,
      expires_at: expiresAt,
      remaining_views_count: availableViews,
      allow_deletions: allowDeletions,
    };
    const info = await this.pgService.insert<SecretEntry>(
      'secret_table',
      insertValues,
      '*',
    );
    return {
      link: info.id,
      expiresAt: info.expires_at.toISOString(),
      remainingViewsCount: info.remaining_views_count,
      allowDeletions: info.allow_deletions,
    };
  }

  /**
   * Получает ссылку из параметров запроса в виде строки, и с помощью нее находит в базе данных запись с секретной фразой.
   * Дальше функция проверяет, есть ли еще у записи доступные просмотры, и не истекла ли она еще по времени.
   * Расшифровывает секретную фразу с помощью функции из другого модуля, уменьшает доступное количество просмотров на 1
   * (обновляет запись в бд).
   *
   *@param {string} link
   *@throws HttpException c кодом 500, если возникли неполадки во время дешифрования фразы или записи в базу данных
   *@throws HttpException c кодом 400, если передана неккоректная ссылка и запись не была найдена
   *@throws HttpException c кодом 403, если у записи уже нет доступных просмотров или она уже истекла
   *@returns Promise<GetSecretResponse> - объект с расшифрованной фразой, и полями с оставшимся числом просмотров,
   * датой истечения, доступностью удаления, и ссылкой доступа.
   * */
  async getSecretPhraseByLink(link: string): Promise<GetSecretResponse> {
    const info = await this.pgService.find<SecretEntry>(
      'secret_table',
      '*',
      'id',
      link,
    );

    if (!info) {
      throw new HttpException(
        'failed to get secret phrase (secret phrase already destroyed or link is invalid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const {
      iv,
      remaining_views_count: remainingViewsCount,
      encrypted_value: encryptedValue,
      expires_at: expiresIn,
      allow_deletions: allowDeletions,
      id,
    } = info;

    if (remainingViewsCount <= 0 || !expiresIn || expiresIn < new Date()) {
      await this.pgService.delete<{ id: string }>(
        'secret_table',
        'id',
        link,
        'id',
      );

      throw new HttpException(
        'the number of requests or the available time for requests has been exhausted',
        HttpStatus.FORBIDDEN,
      );
    }

    const decryptedPhrase = await this.cryptoService.decryptSecretPhrase(
      encryptedValue,
      iv,
    );

    let remainingViewsCount2 = remainingViewsCount;
    remainingViewsCount2--;

    if (remainingViewsCount2 <= 0) {
      await this.pgService.delete<{ id: string }>(
        'secret_table',
        'id',
        link,
        'id',
      );
    }

    await this.pgService.update(
      'secret_table',
      'remaining_views_count',
      remainingViewsCount2,
      'id',
      link,
    );

    return {
      decryptedPhrase: decryptedPhrase,
      link: id,
      remainingViewsCount: remainingViewsCount2,
      expiresAt: expiresIn.toISOString(),
      allowDeletions: allowDeletions,
    };
  }

  /**
   * Получает ссылку из параметров запроса в виде строки, и с помощью нее находит в базе данных запись с секретной фразой.
   * Дальше функция с помощью поля allow_deletions проверяет, можно ли удалить эту запись.
   * Удаляет секретную фразу из базы данных
   *
   *@param {string} link
   *@throws HttpException c кодом 500, если возникли неполадки во время удаления фразы
   *@throws HttpException c кодом 400, если передана неккоректная ссылка и запись не была найдена
   *@throws HttpException c кодом 403, если у записи поле allow_deletions=false, и ее нельзя удалить
   *@returns Promise<IdResponse> - объект полем id - это и уникальный идентификатор записи в бд, и также ссылка,
   *по которой эта запись была доступна.
   * */
  async deleteSecretPhrase(link: string): Promise<IdResponse> {
    const info = await this.pgService.find<SecretEntry>(
      'secret_table',
      '*',
      'id',
      link,
    );

    if (!info) {
      throw new HttpException(
        'failed to delete secret phrase (secret phrase already destroyed or link is invalid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!info.allow_deletions) {
      throw new HttpException(
        'failed to delete secret phrase (secret is not allowed to deletions)',
        HttpStatus.FORBIDDEN,
      );
    }

    return await this.pgService.delete<{ id: string }>(
      'secret_table',
      'id',
      link,
      'id',
    );
  }
}
