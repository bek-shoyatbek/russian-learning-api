import { Module } from '@nestjs/common';
import { UserRankingsController } from './user-rankings.controller';
import { UserRankingsService } from './user-rankings.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserRankingsController],
  providers: [UserRankingsService,PrismaService],
  exports: [UserRankingsService],
})
export class UserRankingsModule {}