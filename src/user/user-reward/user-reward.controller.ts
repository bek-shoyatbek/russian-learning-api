import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UserRewardService } from './user-reward.service';
import { Prisma, UserReward } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRewardDto } from './dto/user-reward.dto';
import { CreateUserRewardDto } from './dto/create-reward.dto';
import { UpdateUserRewardDto } from './dto/update-reward.dto';

@ApiTags('user-reward')
@Controller('user-reward')
export class UserRewardController {
  constructor(private readonly userRewardService: UserRewardService) { }

  @ApiOperation({ summary: 'Get all user rewards' })
  @ApiResponse({
    status: 200,
    description: 'The found user rewards',
    type: [UserRewardDto],
  })
  @Get()
  findAll(@Query('userId', new ParseIntPipe()) userId: number) {
    return this.userRewardService.findAll(userId);
  }
  @ApiOperation({ summary: 'Get single user reward by id' })
  @ApiResponse({
    status: 200,
    description: 'The found user reward',
    type: UserRewardDto,
  })

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.userRewardService.findOne(id);
  }
  @ApiOperation({ summary: 'Create a user reward' })
  @ApiBody({ type: CreateUserRewardDto })
  @ApiResponse({
    status: 201,
    description: 'The created user reward',
    type: UserRewardDto,
  })

  @Post()
  create(@Body() data: Prisma.UserRewardCreateInput) {
    return this.userRewardService.create(data);
  }

  @ApiOperation({ summary: 'Update a user reward' })
  @ApiBody({ type: UpdateUserRewardDto })
  @ApiResponse({
    status: 200,
    description: 'The updated user reward',
    type: UserRewardDto,
  })
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() data: Partial<UserReward>) {
    return this.userRewardService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user reward' })
  @ApiResponse({
    status: 200,
    description: 'The deleted user reward',
    type: UserRewardDto,
  })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.userRewardService.remove(id);
  }
}
