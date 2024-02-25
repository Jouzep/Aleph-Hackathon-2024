import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .addApiKey({ type: 'apiKey', name: 'signature', in: 'header' }, 'signature')
    .addApiKey({ type: 'apiKey', name: 'address', in: 'header' }, 'address')
    .addApiKey({ type: 'apiKey', name: 'message', in: 'header' }, 'message')
    .setTitle('DeStock')
    .setDescription('The DeStock API description')
    .setVersion('1.0')
    .addTag('DeStock')
    .addTag('Dictionnary')
    .addTag('Group')
    .addTag('DeStock')
    .addTag('DeStock')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
