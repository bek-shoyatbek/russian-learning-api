import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoryProgressService {
    constructor(private prisma: PrismaService) { }

    async updateCategoryProgress(userId: number, categoryId: number): Promise<void> {
        // Get all sections in the category
        const sections = await this.prisma.section.findMany({
            where: { categoryId },
        });

        // Get progress for all sections
        const sectionProgress = await this.prisma.userSectionProgress.findMany({
            where: {
                userId,
                section: { categoryId },
            },
        });

        // Calculate overall category progress
        const totalSections = sections.length;
        const completedSections = sectionProgress.filter(p => p.completed).length;
        const percentage = (completedSections / totalSections) * 100;
        const completed = percentage === 100;

        // Update category progress
        await this.prisma.userCategoryProgress.upsert({
            where: {
                userId_categoryId: { userId, categoryId },
            },
            create: {
                userId,
                categoryId,
                percentage,
                completed,
                completedAt: completed ? new Date() : null,
            },
            update: {
                percentage,
                completed,
                completedAt: completed ? new Date() : null,
            },
        });
    }

    async getCategoryProgress(userId: number, categoryId: number) {
        const progress = await this.prisma.userCategoryProgress.findUnique({
            where: {
                userId_categoryId: { userId, categoryId },
            },
        });

        if (!progress) {
            return {
                completed: false,
                percentage: 0,
            };
        }

        return progress;
    }

    async getAllCategoryProgress(userId: number) {
        return this.prisma.userCategoryProgress.findMany({
            where: { userId },
            include: {
                category: true,
            },
        });
    }
}