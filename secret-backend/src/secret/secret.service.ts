import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSecretDto } from '../dto/create-secret.dto';
import { CONNECTION } from '../constants/constansts';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class SecretService {
  constructor(
    @Inject(CONNECTION) private connection: any,
    @Inject(CryptoService) private cryptoService: CryptoService,
  ) {}

  async setSecretPhrase(secretDto: CreateSecretDto) {
    const client = await this.connection.connect();

    try {
      const { secretPhrase, availableViews, expiresInTimestamp } = secretDto;

      const { encryptedTextBase64, ivBase64 } =
        await this.cryptoService.encryptSecretPhrase(secretPhrase);

      const link = await this.cryptoService.generateUniqueLink();
      if (!link) {
      }
      const expiresAt = new Date(Date.now() + expiresInTimestamp);

      const queryText = `INSERT INTO secret_table(encrypted_value, iv, link, expires_at, remaining_views_count) VALUES ($1, $2, $3, $4, $5)`;
      const insertValues = [
        encryptedTextBase64,
        ivBase64,
        link,
        expiresAt,
        availableViews,
      ];

      const result = await client.query(queryText, insertValues);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw new HttpException(
        'failed to insert value',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      client.release();
    }
  }

  getSecretPhraseByLink(link: string) {}
}
