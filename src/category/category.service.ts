import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) { }


    async findAll(): Promise<Category[]> {
        return this.prisma.category.findMany({ include: { Section: true } });
    }

    async findOne(categoryId: number): Promise<Category> {
        return this.prisma.category.findUnique({ where: { id: categoryId }, include: { Section: true } });
    }

    async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        return this.prisma.category.create({ data });
    }

    async update(categoryId: number, data: Prisma.CategoryUpdateInput): Promise<Category> {
        return this.prisma.category.update({ where: { id: categoryId }, data });
    }

    async remove(categoryId: number): Promise<Category> {
        return this.prisma.category.delete({ where: { id: categoryId } });
    }
}
