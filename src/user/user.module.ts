import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRankingsService } from 'src/user-rankings/user-rankings.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRankingsService],
  imports: [],
})
export class UserModule { }
