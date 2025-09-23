import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSecretDto } from '../dto/create-secret.dto';
import { SecretService } from './secret.service';

@Controller('/secret')
export class SecretController {
  constructor(private readonly secretService: SecretService) {}

  @Post('/create-secret-phrase')
  setSecretPhrase(@Body() secretDto: CreateSecretDto) {
    return this.secretService.setSecretPhrase(secretDto);
  }

  @Get('/:link')
  getSecretPhraseByLink(@Param('link') link: string) {
    return this.secretService.getSecretPhraseByLink(link);
  }
}
