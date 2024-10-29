import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()

  findAll() {
    return this.userService.findAll();
  }


  @Get(':id')

  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Post()

  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.create(createUserDto);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.userService.update(+id, updateUserDto);
  }


  @Delete(':id')

  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

}

