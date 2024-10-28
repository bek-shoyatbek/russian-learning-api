import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StarService } from './star.service';
import { Prisma } from '@prisma/client';

@Controller('star')
export class StarController {
  constructor(private readonly starService: StarService) {}

  @Post()
  create(@Body() createStarDto: Prisma.StarCreateInput & { userId: number }) {
    return this.starService.create(createStarDto.userId, createStarDto.star);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: number) {
    return this.starService.findAll(userId);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateStarDto: Prisma.StarUpdateInput & { star: number }) {
    return this.starService.update(id, updateStarDto.star);
  }
}
