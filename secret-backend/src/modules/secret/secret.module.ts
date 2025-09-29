import { Module } from '@nestjs/common';
import { SecretController } from './secret.controller';
import { SecretService } from './secret.service';
import { CryptoModule } from '../crypto/crypto.module';

@Module({
  controllers: [SecretController],
  providers: [SecretService],
  imports: [CryptoModule],
})
export class SecretModule {}
