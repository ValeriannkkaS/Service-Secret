import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';
import { CONNECTION } from '../constants/constansts';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          user: configService.get<string>('POSTGRES_USER'),
          host: configService.get<string>('POSTGRES_HOST'),
          database: configService.get<string>('POSTGRES_DB'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          port: configService.get<string>('POSTGRES_PORT'),
        });
        return pool;
      },
    },
  ],
  exports: [CONNECTION],
})
export class PgModule {}
