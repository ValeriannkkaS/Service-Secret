import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import helmet from 'helmet';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

const PORT = process.env.PORT || 3000;

// todo dotenv убрать
// todo убрать не нужные тебе пакеты
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Service Secret')
    .setDescription('Service Secret API description')
    .setVersion('1.0')
    .addTag('service-secret')
    .addGlobalResponse({ status: 500, description: 'Internal Server Error' })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  app.use(helmet());
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE'],
  });
  await app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}
bootstrap();
