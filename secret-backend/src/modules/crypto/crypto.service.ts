import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { EncryptSecret } from './interfaces/encrypt-secret.interface';
import { GenerateSecret } from './interfaces/generate-secret.interface';

// todo jsdoc
@Injectable()
export class CryptoService {
  constructor(private configService: ConfigService) {}

  // todo interface
  // todo jsdoc + interface
  /**
   * Получает длину нужной секретной фразы аргументом в виде числа, генерирует случайную последовательность байт
   * заданной длины, а затем преобразует в строку кодировки hex и обрезает до нужной длины, потом возвращает получившуюся
   * фразу
   *
   *@param {number} length
   *@returns Promise<GenerateSecret> - объект со сгенерированной фразой, в объекте только одно поле.
   * */
  async generateSecret(length: number): Promise<GenerateSecret> {
    return {
      secretPhrase: randomBytes(length).toString('hex').slice(0, length),
    };
  }

  /**
   * Получает аргументом секретную фразу в виде строки,
   * генерирует случайным образом вектор инициализации, преобразует его в строку с кодировкой base64
   * берет из переменных окружения ключ шифрования/дешифрования в виде строки с кодировкой base64, преобразует его в ArrayBuffer
   * создает объект для шифрования с помощью модуля crypto из nodejs, и с помощью этого объекта шифрует фразу
   * симметричным алгоритмом шифрования aes-256-ctr.
   * Преобразует получившуюся зашифрованную фразу из ArrayBuffer в base64,
   *
   *@param {string} phrase
   *@throws HttpException c кодом 500, если возникли неполадки во время шифрования фразы
   *@returns Promise<EncryptSecret> - объект с полями:
   * 1 - зашифрованная фраза base64
   * 2 - вектор инициализации base64
   * */
  async encryptSecretPhrase(phrase: string): Promise<EncryptSecret> {
    try {
      const iv = randomBytes(16);
      const ivBase64 = iv.toString('base64');

      const keyBase64 = this.configService.get<string>('CRYPTO_KEY') || 'ss';
      const key = Buffer.from(keyBase64, 'base64');

      const cipher = createCipheriv('aes-256-ctr', key, iv);

      const encryptedText = Buffer.concat([
        cipher.update(phrase),
        cipher.final(),
      ]);

      const encryptedTextBase64 = encryptedText.toString('base64');

      return { encryptedTextBase64: encryptedTextBase64, ivBase64: ivBase64 };
    } catch (error) {
      throw new HttpException(
        'failed to encrypt phrase',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Получает аргументом зашифрованную секретную фразу в виде строки в кодировке base64, преобразует ее в ArrayBuffer,
   * также получает аргументом вектор инициализации в виде строки в кодировке base64, преобразует ее в ArrayBuffer,
   * генерирует случайным образом вектор инициализации, преобразует его в строку с кодировкой base64
   * берет из переменных окружения ключ шифрования/дешифрования в виде строки с кодировкой base64, преобразует его в ArrayBuffer
   * создает объект для дешифрования с помощью модуля crypto из nodejs, и с помощью этого объекта дешифрует фразу
   * симметричным алгоритмом шифрования aes-256-ctr.
   * Преобразует получившуюся расшифрованную фразу из ArrayBuffer в utf-8
   *
   *@param {string} encryptedPhraseBase64
   *@param {string} ivBase64
   *@throws HttpException c кодом 500, если возникли неполадки во время дешифрования фразы
   *@returns Promise<string> - строка с расшифрованной фразой в кодировке utf-8
   * */
  async decryptSecretPhrase(
    encryptedPhraseBase64: string,
    ivBase64: string,
  ): Promise<string> {
    try {
      const encryptedPhrase = Buffer.from(encryptedPhraseBase64, 'base64');
      const iv = Buffer.from(ivBase64, 'base64');

      const keyBase64 =
        (await this.configService.get<string>('CRYPTO_KEY')) || 'ss';
      const key = Buffer.from(keyBase64, 'base64');

      const decipher = createDecipheriv('aes-256-ctr', key, iv);

      const decryptedText = Buffer.concat([
        decipher.update(encryptedPhrase),
        decipher.final(),
      ]);

      return decryptedText.toString('utf-8');
    } catch (error) {
      throw new HttpException(
        'failed to decrypt phrase',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
