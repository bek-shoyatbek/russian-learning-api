import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { Prisma, Reward } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RewardDto } from './dto/reward.dto';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';

@ApiTags('reward')
@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) { }

  @ApiOperation({ summary: 'Get all rewards' })
  @ApiResponse({
    status: 200,
    description: 'The found rewards',
    type: [RewardDto],
  })
  @Get()
  findAll() {
    return this.rewardService.findAll();
  }
  @ApiOperation({ summary: 'Get single reward by id' })
  @ApiResponse({
    status: 200,
    description: 'The found reward',
    type: RewardDto,
  })

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.rewardService.findOne(id);
  }
  @ApiOperation({ summary: 'Create a reward' })
  @ApiBody({ type: CreateRewardDto })
  @ApiResponse({
    status: 201,
    description: 'The created reward',
    type: RewardDto,
  })

  @Post()
  create(@Body() data: Prisma.RewardCreateInput) {
    return this.rewardService.create(data);
  }

  @ApiOperation({ summary: 'Update a reward' })
  @ApiBody({ type: UpdateRewardDto })
  @ApiResponse({
    status: 200,
    description: 'The updated reward',
    type: RewardDto,
  })
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() data: Partial<Reward>) {
    return this.rewardService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reward' })
  @ApiResponse({
    status: 200,
    description: 'The deleted reward',
    type: RewardDto,
  })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.rewardService.remove(id);
  }
}
