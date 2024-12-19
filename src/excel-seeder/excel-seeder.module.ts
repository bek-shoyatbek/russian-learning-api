import { Module } from '@nestjs/common';
import { ExcelSeederService } from './excel-seeder.service';
import { ExcelSeederController } from './excel-seeder.controller';

@Module({
  controllers: [ExcelSeederController],
  providers: [ExcelSeederService],
})
export class ExcelSeederModule {}
