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
  async generateSecret(length: number): Promise<GenerateSecret> {
    return {
      secretPhrase: randomBytes(length).toString('hex').slice(0, length),
    };
  }

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
