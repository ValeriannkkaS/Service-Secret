import { Module } from '@nestjs/common';
import { PgModule } from './pg/pg.module';
import { SecretModule } from './secret/secret.module';
import { CryptoModule } from './crypto/crypto.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import * as process from 'node:process';

// todo сделать папку modules
// todo изучить https://help.areal.company/services/development_web/notes/nestjs.html
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
