import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSecretDto } from './dto/create-secret.dto';
import { CryptoService } from '../crypto/crypto.service';
import { PgService } from '../pg/pg.service';
import { CreateSecretResponse } from './interfaces/response-create-secret.interface';
import { GetSecretResponse } from './interfaces/response-get-secret.interface';
import { IdResponse } from './interfaces/id-response.interface';
import { SecretEntry } from '../pg/interfaces/secret-entry.interface';

@Injectable()
export class SecretService {
  constructor(
    @Inject(CryptoService) private cryptoService: CryptoService,
    @Inject(PgService) private pgService: PgService,
  ) {}

  // todo jsdoc
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
    console.log(info);
    //todo убрать все console.log()
    return {
      link: info.id,
      expiresAt: info.expires_at.toISOString(),
      remainingViewsCount: info.remaining_views_count,
      allowDeletions: info.allow_deletions,
    };
  }

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
        HttpStatus.BAD_REQUEST,
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
