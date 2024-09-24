import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRewardModule } from './user-reward/user-reward.module';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [UserRewardModule],
})
export class UserModule { }
