import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT');



  // Middlewares
  app.enableCors({ origin: "*" });
  app.useGlobalFilters(new PrismaExceptionFilter());




  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
