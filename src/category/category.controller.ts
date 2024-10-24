import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, Prisma } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }
<<<<<<< HEAD


  @Post()
  async create(@Body() createCategoryDto: Prisma.CategoryCreateInput): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(+id);
  }


  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: Prisma.CategoryUpdateInput): Promise<Category> {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Category> {
    return this.categoryService.remove(+id);
  }
=======
>>>>>>> a9bc5e745afe403438e052e948fee081965ca5ab
}
