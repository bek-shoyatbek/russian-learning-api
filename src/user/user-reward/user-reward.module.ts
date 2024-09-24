import { Module } from '@nestjs/common';
import { UserRewardService } from './user-reward.service';
import { UserRewardController } from './user-reward.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserRewardController],
  providers: [UserRewardService, PrismaService],
})
export class UserRewardModule { }
