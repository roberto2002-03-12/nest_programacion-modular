/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // activar validaciones de las librerias
  // class-validator
  app.useGlobalPipes(new ValidationPipe({
    // quitar del payload todos los atributos no definidos
    whitelist: true,
    // hacer lo mismo de arriba pero mandar un error quejandoce
    forbidNonWhitelisted: true
  }));
  await app.listen(3000);
}
bootstrap();
