import { Controller } from '@nestjs/common';
import { ExcelSeederService } from './excel-seeder.service';

@Controller('excel-seeder')
export class ExcelSeederController {
  constructor(private readonly excelSeederService: ExcelSeederService) {}
}
