import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  let httpsOptions: { key: Buffer; cert: Buffer } | undefined = undefined;
  
  try {
    httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, '../ssl/private-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, '../ssl/public-certificate.pem')),
    };
  } catch (error) {
    console.warn('SSL certificates not found, running in HTTP mode');
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });
  
  // Установка таймаута для Express
  app.set('timeout', 60000);
  
  // Настройка CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'https://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true,
    maxAge: 3600,
  });
  
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Система записи в администрацию')
    .setDescription('API для системы онлайн-записи к сотрудникам администрации')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Глобальный обработчик ошибок
  app.use((err: any, req: any, res: any, next: any) => {
    if (err instanceof HttpException) {
      res.status(err.getStatus()).json(err.getResponse());
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  });

  await app.listen(3000, '0.0.0.0');
  const protocol = httpsOptions ? 'https' : 'http';
  console.log(`Приложение запущено на ${protocol}://localhost:3000`);
}
bootstrap();
