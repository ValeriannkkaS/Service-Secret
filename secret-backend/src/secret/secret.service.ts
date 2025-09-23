import { Inject, Injectable } from '@nestjs/common';
import { CreateSecretDto } from '../dto/create-secret.dto';
import { CONNECTION } from '../constants/constansts';
import { CryptoService } from '../link/crypto.service';

@Injectable()
export class SecretService {
  constructor(
    @Inject(CONNECTION) private connection: any,
    @Inject(CryptoService) private cryptoService: CryptoService,
  ) {}

  async setSecretPhrase(secretDto: CreateSecretDto) {
    return this.cryptoService.decryptSecretPhrase(
      'LxdDL7xqekTB/GF39g==',
      'Ap2n16Hx2DP5ElVZDqzz0A==',
    );

    return this.cryptoService.encryptSecretPhrase(secretDto.secretPhrase);
  }

  getSecretPhraseByLink(link: string) {}
}
