import { Module } from '@nestjs/common';
import { SecretController } from './secret.controller';
import { SecretService } from './secret.service';
import { LinkModule } from '../link/link.module';

@Module({
  controllers: [SecretController],
  providers: [SecretService],
  imports: [LinkModule],
})
export class SecretModule {}
