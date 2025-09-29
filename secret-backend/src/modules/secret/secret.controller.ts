import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Delete,
} from '@nestjs/common';
import { CreateSecretDto } from './dto/create-secret.dto';
import { SecretService } from './secret.service';
import { CreateSecretPhrasePipe } from '../../pipes/create-secret-phrase.pipe';
import { CryptoService } from '../crypto/crypto.service';
import { createSecretPhraseShema } from '../../pipes/createSecretPhraseShema';

// todo swagger описать
@Controller('/secret')
export class SecretController {
  constructor(
    private readonly secretService: SecretService,
    private readonly cryptoService: CryptoService,
  ) {}

  @Post('/create-secret-phrase')
  @HttpCode(HttpStatus.CREATED)
  setSecretPhrase(
    @Body(new CreateSecretPhrasePipe(createSecretPhraseShema))
    secretDto: CreateSecretDto,
  ) {
    return this.secretService.setSecretPhrase(secretDto);
  }

  @Get('/:link')
  @HttpCode(HttpStatus.OK)
  getSecretPhraseByLink(@Param('link', new ParseUUIDPipe()) link: string) {
    return this.secretService.getSecretPhraseByLink(link);
  }

  @Get('/generate/:length')
  @HttpCode(HttpStatus.OK)
  generateSecretPhrase(@Param('length', new ParseIntPipe()) length: number) {
    return this.cryptoService.generateSecret(length);
  }

  @Delete('/:link')
  @HttpCode(HttpStatus.OK)
  deleteSecretPhrase(@Param('link', new ParseUUIDPipe()) link: string) {
    return this.secretService.deleteSecretPhrase(link);
  }
}
