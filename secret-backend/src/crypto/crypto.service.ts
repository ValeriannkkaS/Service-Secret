import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  randomUUID,
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from 'crypto';
import { ConfigService } from '@nestjs/config';
import { PgService } from '../pg/pg.service';

@Injectable()
export class CryptoService {
  constructor(
    @Inject(PgService) private pgService: PgService,
    private configService: ConfigService,
  ) {}

  async generateUniqueLink() {
    const link = randomUUID().toString();
    try {
      const result = await this.pgService.findOne(
        'secret_table',
        '*',
        'link',
        link,
      );

      if (result) {
        throw new HttpException(
          'failed to generate unique link',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return link;
    } catch (error) {
      throw error;
    }
  }

  async generateSecret(length: number) {
    return randomBytes(length).toString('hex').slice(0, length);
  }

  async encryptSecretPhrase(phrase: string) {
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

  async decryptSecretPhrase(encryptedPhraseBase64: string, ivBase64: string) {
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
