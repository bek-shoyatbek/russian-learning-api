import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRewardModule } from './users-reward/users-reward.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  imports: [UsersRewardModule],
})
export class UsersModule { }
