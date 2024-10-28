import { Module } from '@nestjs/common';
import { StarService } from './star.service';
import { StarController } from './star.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StarController],
  providers: [StarService, PrismaService],
})
export class StarModule {}
