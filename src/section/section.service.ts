import { Injectable } from '@nestjs/common';
import { Prisma, Section } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class SectionService {
    constructor(private readonly prisma: PrismaService) { }

    async create(categoryId: number, data: Prisma.SectionCreateInput): Promise<Section> {
        return this.prisma.section.create({
            data: {
                category: { connect: { id: categoryId } },
                ...data,
            },
        });
    }

    async findAll(categoryId: number): Promise<Section[]> {
        return this.prisma.section.findMany({
            where: { categoryId },
            include: { category: true },
        });
    }

    async findOne(sectionId: number): Promise<Section> {
        return this.prisma.section.findUnique({
            where: { id: sectionId },
            include: { category: true },
        });
    }

    async update(sectionId: number, data: Prisma.SectionUpdateInput & { avatarPath?: string }): Promise<Section> {
        const { avatarPath, ...updateData } = data;

        if (avatarPath) {
            const currentSection = await this.prisma.section.findUnique({
                where: { id: sectionId },
                select: { image: true },
            });

            if (currentSection?.image) {
                try {
                    await unlinkAsync(currentSection.image);
                } catch (error) {
                    console.error('Error deleting old image file:', error);
                }
            }

            updateData.image = avatarPath;
        }

        return this.prisma.section.update({
            where: { id: sectionId },
            data: updateData,
        });
    }

    async remove(sectionId: number): Promise<Section> {
        const section = await this.prisma.section.findUnique({
            where: { id: sectionId },
            select: { image: true },
        });

        if (section?.image) {
            try {
                await unlinkAsync(section.image);
            } catch (error) {
                console.error('Error deleting image file:', error);
            }
        }

        return this.prisma.section.delete({ where: { id: sectionId } });
    }
}