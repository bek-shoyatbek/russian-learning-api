import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import * as morgan from 'morgan';
import { ExcelSeederService } from './excel-seeder/excel-seeder.service';

declare global {
  interface BigInt {
    toJSON(): Number;
  }
}


BigInt.prototype.toJSON = function () {
  return Number(this);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT');

  const excelSeederService = app.get(ExcelSeederService);
  await excelSeederService.seedData('words.xlsx');

  // Middlewares
  app.enableCors({ origin: "*" });
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.use(morgan.default('dev'));




  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
