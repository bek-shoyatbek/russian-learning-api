import { Module } from '@nestjs/common';
import { UsersRewardService } from './users-reward.service';
import { UsersRewardController } from './users-reward.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UsersRewardController],
  providers: [UsersRewardService, PrismaService],
})
export class UsersRewardModule { }
