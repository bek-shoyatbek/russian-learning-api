import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [UserDto],
  })
  findAll() {
    return this.userService.findAll();
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: UserDto,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
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
    return this.userService.create(createUserDto);
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
    return this.userService.update(+id, updateUserDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: 'The deleted record',
    type: UserDto,
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

}

