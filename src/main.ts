import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as config from './config';

const port = process.env.PORT || 3000;

function initSwagget(app: INestApplication) {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API')
    .setDescription('API Description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*', // Allow any origin
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    },
  });
  if (config.default().nodeEnvironment === 'dev') {
    initSwagget(app);
  }
  await app.listen(port);
}
bootstrap();
