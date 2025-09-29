import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import helmet from 'helmet';
import * as process from 'node:process';

dotenv.config();

const PORT = process.env.PORT || 3000;

// todo dotenv убрать
// todo убрать не нужные тебе пакеты
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE'],
  });

  await app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}
bootstrap();
