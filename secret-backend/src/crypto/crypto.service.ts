import { Injectable } from '@nestjs/common';
import {
  randomUUID,
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scrypt,
} from 'crypto';
import { promisify } from 'util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
  constructor(private configService: ConfigService) {}

  generateUniqueLink() {
    return randomUUID().toString();
  }
  async encryptSecretPhrase(phrase: string) {
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
  }

  async decryptSecretPhrase(encryptedPhraseBase64: string, ivBase64: string) {
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
  }
}
