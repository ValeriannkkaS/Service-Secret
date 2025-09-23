import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateSecretDto } from './dto/create-secret.dto';
import { SecretService } from './secret.service';
import { CreateSecretPhrasePipe } from '../pipes/create-secret-phrase.pipe';

@Controller('/secret')
export class SecretController {
  constructor(private readonly secretService: SecretService) {}

  @Post('/create-secret-phrase')
  setSecretPhrase(
    @Body(new CreateSecretPhrasePipe()) secretDto: CreateSecretDto,
  ) {
    return this.secretService.setSecretPhrase(secretDto);
  }

  @Get('/:link')
  getSecretPhraseByLink(@Param('link', new ParseUUIDPipe()) link: string) {
    return this.secretService.getSecretPhraseByLink(link);
  }
}
