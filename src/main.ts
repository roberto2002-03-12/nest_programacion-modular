/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
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

  // configurar Swagger para documentación
  const configSwagger = new DocumentBuilder()
    .setTitle('Curso de nestjs Modular')
    .setDescription('Documentación de API')
    .setVersion('1.0')
    .addTag('Platzi curso')
    .build();

  // crear documento
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
