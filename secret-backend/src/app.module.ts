import { Module } from '@nestjs/common';
import { PgModule } from './pg/pg.module';
import { SecretModule } from './secret/secret.module';
import { CryptoModule } from './crypto/crypto.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    PgModule,
    SecretModule,
    CryptoModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
