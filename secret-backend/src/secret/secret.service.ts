import { Inject, Injectable } from '@nestjs/common';
import { CreateSecretDto } from '../dto/create-secret.dto';
import { CONNECTION } from '../constants/constansts';

@Injectable()
export class SecretService {
  constructor(@Inject(CONNECTION) private connection: any) {}

  setSecretPhrase(secretDto: CreateSecretDto) {
    return this.connection.query('SELECT * FROM "secret-table"');
  }

  getSecretPhraseByLink(link: string) {}
}
