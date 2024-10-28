import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CoinService } from './coin.service';
import { Prisma } from '@prisma/client';

@Controller('coin')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @Post()
  create(@Body() createCoinDto: Prisma.CoinCreateInput & { userId: number }) {
    return this.coinService.create(createCoinDto.userId, createCoinDto.coin);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: number) {
    return this.coinService.findAll(userId);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCoinDto: Prisma.CoinUpdateInput & { coin: number }) {
    return this.coinService.update(id, updateCoinDto.coin);
  }
}
