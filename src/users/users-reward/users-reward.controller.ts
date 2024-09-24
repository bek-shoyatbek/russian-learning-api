import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersRewardService } from './users-reward.service';
import { Prisma, UserReward } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRewardDto } from './dto/user-reward.dto';
import { CreateUserRewardDto } from './dto/create-reward.dto';
import { UpdateUserRewardDto } from './dto/update-reward.dto';

@ApiTags('users-reward')
@Controller('users-reward')
export class UsersRewardController {
  constructor(private readonly usersRewardService: UsersRewardService) { }

  @ApiOperation({ summary: 'Get all user rewards' })
  @ApiResponse({
    status: 200,
    description: 'The found user rewards',
    type: [UserRewardDto],
  })
  @Get()
  findAll(@Query('userId', new ParseIntPipe()) userId: number) {
    return this.usersRewardService.findAll(userId);
  }
  @ApiOperation({ summary: 'Get single user reward by id' })
  @ApiResponse({
    status: 200,
    description: 'The found user reward',
    type: UserRewardDto,
  })

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersRewardService.findOne(id);
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
    return this.usersRewardService.create(data);
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
    return this.usersRewardService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user reward' })
  @ApiResponse({
    status: 200,
    description: 'The deleted user reward',
    type: UserRewardDto,
  })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersRewardService.remove(id);
  }
}
