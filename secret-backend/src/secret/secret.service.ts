import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSecretDto } from './dto/create-secret.dto';
import { CONNECTION } from '../constants/constansts';
import { CryptoService } from '../crypto/crypto.service';
import { GetByLinkInterface } from '../interfaces/getByLinkInterface';
import { PgService } from '../pg/pg.service';

@Injectable()
export class SecretService {
  constructor(
    @Inject(CryptoService) private cryptoService: CryptoService,
    @Inject(PgService) private pgService: PgService,
  ) {}

  async setSecretPhrase(secretDto: CreateSecretDto) {
    try {
      const { secretPhrase, availableViews, expiresInTimestamp } = secretDto;

      const { encryptedTextBase64, ivBase64 } =
        await this.cryptoService.encryptSecretPhrase(secretPhrase);

      const link = await this.cryptoService.generateUniqueLink();
      if (!link) {
      }
      const expiresAt = new Date(Date.now() + expiresInTimestamp);

      const insertValues = {
        encrypted_value: encryptedTextBase64,
        iv: ivBase64,
        link: link,
        expires_at: expiresAt,
        remaining_views_count: availableViews,
      };
      return await this.pgService.insert('secret_table', insertValues, 'link');
    } catch (error) {
      throw error;
    }
  }

  async getSecretPhraseByLink(link: string) {
    try {
      const info: GetByLinkInterface = await this.pgService.findOne(
        'secret_table',
        '*',
        'link',
        link,
      );

      if (!info) {
        throw new HttpException(
          'failed to get secret phrase (secret phrase already destroyed or link is invalid)',
          HttpStatus.BAD_REQUEST,
        );
      }
      let {
        iv,
        remaining_views_count: remainingViewsCount,
        encrypted_value: encryptedValue,
        expires_at: expiresIn,
      } = info;

      if (remainingViewsCount <= 0 || !expiresIn || expiresIn < new Date()) {
        await this.pgService.findOneAndDelete('secret_table', 'link', link);

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

      await this.pgService.findOneAndUpdate(
        'secret_table',
        'remaining_views_count',
        remainingViewsCount,
        'link',
        link,
      );

      return encryptedPhrase;
    } catch (error) {
      throw error;
    }
  }
}
