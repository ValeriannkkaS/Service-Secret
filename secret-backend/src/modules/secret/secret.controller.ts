import {
  Body,
  Controller,
  Get,
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
import { ApiTags } from '@nestjs/swagger';
import { ControllerDecoratorAggregator } from '../../swagger.decorator';
import templateStyleControllerConfig from './controller';

@ApiTags('secret')
@Controller('/secret')
export class SecretController {
  constructor(
    private readonly secretService: SecretService,
    private readonly cryptoService: CryptoService,
  ) {}

  @Post('/create-secret-phrase')
  @ControllerDecoratorAggregator(
    templateStyleControllerConfig.createSecretPhrase,
  )
  setSecretPhrase(
    @Body(new CreateSecretPhrasePipe(createSecretPhraseShema))
    secretDto: CreateSecretDto,
  ) {
    return this.secretService.setSecretPhrase(secretDto);
  }

  @Get('/:link')
  @ControllerDecoratorAggregator(
    templateStyleControllerConfig.getSecretPhraseByLink,
  )
  getSecretPhraseByLink(@Param('link', new ParseUUIDPipe()) link: string) {
    return this.secretService.getSecretPhraseByLink(link);
  }

  @Get('/generate/:length')
  @ControllerDecoratorAggregator(
    templateStyleControllerConfig.generateSecretPhrase,
  )
  generateSecretPhrase(@Param('length', new ParseIntPipe()) length: number) {
    return this.cryptoService.generateSecret(length);
  }

  @Delete('/:link')
  @ControllerDecoratorAggregator(
    templateStyleControllerConfig.deleteSecretPhrase,
  )
  deleteSecretPhrase(@Param('link', new ParseUUIDPipe()) link: string) {
    return this.secretService.deleteSecretPhrase(link);
  }
}
