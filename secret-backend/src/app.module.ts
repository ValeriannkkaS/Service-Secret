import { Module } from '@nestjs/common';
import { PgModule } from './modules/pg/pg.module';
import { SecretModule } from './modules/secret/secret.module';
import { CryptoModule } from './modules/crypto/crypto.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './modules/tasks/tasks.module';
import * as process from 'node:process';

@Module({
  imports: [
    PgModule,
    SecretModule,
    CryptoModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
