import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [UserDto],
  })
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: UserDto,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }


  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({
    description: 'User data',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The created record',
    type: UserDto,
  })
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }


  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({
    description: 'User data: username, email, avatar',
    type: Object,
  })
  @ApiResponse({
    status: 200,
    description: 'The updated record',
    type: UserDto,
  })
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.usersService.update(+id, updateUserDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: 'The deleted record',
    type: UserDto,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

}

