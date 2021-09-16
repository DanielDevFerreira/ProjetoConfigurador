import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  app.useGlobalPipes( new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:4200',
  });
  // app.use('/', express.static('assets/img'));
  // app.use(csurf());
  const port = 3000;
  await app.listen(port);
}
bootstrap();

