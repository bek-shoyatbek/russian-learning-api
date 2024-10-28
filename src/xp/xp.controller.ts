import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { XpService } from './xp.service';

@Controller('xp')
export class XpController {
  constructor(private readonly xpService: XpService) {}

  @Post()
  create(@Body() createXpDto: Prisma.XPCreateInput & { userId: number }) {
    return this.xpService.create(createXpDto.userId, createXpDto.xp);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: number) {
    return this.xpService.findAll(userId);
  }


  @Put(':id')
  update(@Param('id') id: number, @Body() updateXpDto: Prisma.XPUpdateInput & { xp: number }) {
    return this.xpService.update(id, updateXpDto.xp);
  }
}
