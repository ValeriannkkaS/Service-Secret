import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('PORT') || 3000;
  const CLIENT_URL = configService.get<string>('CLIENT_URL') || '';

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
    origin: CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE'],
  });
  await app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}
bootstrap();
