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
  async create(@Body() createUserDto: Prisma.UserCreateInput) {
    // check this email is unique
    const user = await this.userService.findOneByEmail(createUserDto.email);

    if (user) {
      throw new Error('User already exists');
    }
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

