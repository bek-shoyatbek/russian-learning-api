import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CoinController } from './coin.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CoinController],
  providers: [CoinService, PrismaService],
})
export class CoinModule {}
