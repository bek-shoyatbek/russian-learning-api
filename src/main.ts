import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT');

  // Swagger docs
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Russian learning app API')
    .setVersion('1.0')
    .addTag('user')
    .addTag('reward')
    .addTag("app")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  // Middlewares
  app.use(morgan('dev'));
  app.enableCors({origin: "*"});
  app.useGlobalFilters(new PrismaExceptionFilter());




  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
