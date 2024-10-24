import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { SectionService } from './section.service';
import { Section } from '@prisma/client';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) { }

  @Get()
  async findAll(@Query('categoryId', new ParseIntPipe()) categoryId: number): Promise<any> {
    return this.sectionService.findAll(categoryId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.sectionService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))
  async create(
    @Query('categoryId', new ParseIntPipe()) categoryId: number,
    @Body() data: any,
    @UploadedFile() avatar: Express.Multer.File
  ): Promise<Section> {
    if (avatar) {
      data.avatar = avatar.path;
    }
    return this.sectionService.create(categoryId, data);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))
  async update(
    @Param('id') id: string,
    @Body() data: any,
    @UploadedFile() avatar: Express.Multer.File
  ): Promise<any> {
    if (avatar) {
      data.avatarPath = avatar.path;
    }
    return this.sectionService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.sectionService.remove(+id);
  }
}