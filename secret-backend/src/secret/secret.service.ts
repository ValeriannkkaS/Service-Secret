import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSecretDto } from '../dto/create-secret.dto';
import { CONNECTION } from '../constants/constansts';
import { CryptoService } from '../crypto/crypto.service';
import { GetByLinkInterface } from '../interfaces/getByLinkInterface';

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

      const queryText = `INSERT INTO secret_table(encrypted_value, iv, link, expires_at, remaining_views_count) VALUES ($1, $2, $3, $4, $5) RETURNING link`;
      const insertValues = [
        encryptedTextBase64,
        ivBase64,
        link,
        expiresAt,
        availableViews,
      ];

      const result = await client.query(queryText, insertValues);
      await client.query('COMMIT');
      return result.rows[0];
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

  async getSecretPhraseByLink(link: string) {
    const client = await this.connection.connect();
    try {
      const queryText = 'SELECT * FROM secret_table WHERE link = $1';
      const result = await client.query(queryText, [link]);

      const info: GetByLinkInterface | undefined = result.rows[0];

      if (!info) {
        throw new HttpException(
          'failed to get secret phrase',
          HttpStatus.NOT_FOUND,
        );
      }
      let {
        iv,
        remaining_views_count: remainingViewsCount,
        encrypted_value: encryptedValue,
        expires_at: expiresIn,
      } = info;

      if (remainingViewsCount <= 0 || !expiresIn || expiresIn < new Date()) {
        const queryText = 'DELETE FROM secret_table WHERE link = $1';
        const deletedPhrase = await client.query(queryText, [link]);
        throw new HttpException(
          'the number of requests or the available time for requests has been exhausted',
          HttpStatus.FORBIDDEN,
        );
      }

      const encryptedPhrase = await this.cryptoService.decryptSecretPhrase(
        encryptedValue,
        iv,
      );
      remainingViewsCount--;

      const updateQueryText =
        'UPDATE secret_table SET remaining_views_count = $1 WHERE link = $2';
      await client.query(updateQueryText, [remainingViewsCount, link]);

      return encryptedPhrase;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}
