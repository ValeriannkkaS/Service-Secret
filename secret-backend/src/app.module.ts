import { Module } from '@nestjs/common';
import { PgModule } from './pg/pg.module';
import { SecretModule } from './secret/secret.module';
import { CryptoModule } from './crypto/crypto.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PgModule, SecretModule, CryptoModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
