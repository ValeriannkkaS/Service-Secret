import { Module } from '@nestjs/common';
import { PgModule } from './pg/pg.module';
import { SecretModule } from './secret/secret.module';
import { LinkModule } from './link/link.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PgModule, SecretModule, LinkModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
