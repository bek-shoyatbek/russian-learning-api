import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TestCompletionDto } from './dto/test-completion.dto';
import { ProgressUpdateResult } from './types/progress-update-result';
import { CategoryProgressService } from './category-progress.service';

@Injectable()
export class TestProgressService {
    constructor(private prisma: PrismaService,
        private categoryProgressService: CategoryProgressService
    ) { }

    async completeTest(data: TestCompletionDto): Promise<ProgressUpdateResult> {
        try {
            // Check if test exists
            const test = await this.prisma.test.findUnique({
                where: { id: data.testId },
                include: { section: true },
            });

            if (!test) {
                return { success: false, message: 'Test not found' };
            }

            // Create test completion record
            const completion = await this.prisma.userTestCompletion.create({
                data: {
                    userId: data.userId,
                    testId: data.testId,
                    score: data.score,
                },
            });

            // Update section progress
            await this.updateSectionProgress(data.userId, test.sectionId);

            return {
                success: true,
                message: 'Test completed successfully',
                data: completion,
            };
        } catch (error) {
            if (error.code === 'P2002') {
                return { success: false, message: 'Test already completed' };
            }
            throw error;
        }
    }

    private async updateSectionProgress(userId: number, sectionId: number): Promise<void> {
        // Get all tests in the section
        const sectionTests = await this.prisma.test.findMany({
            where: { sectionId },
        });

        // Get completed tests in the section
        const completedTests = await this.prisma.userTestCompletion.count({
            where: {
                userId,
                test: { sectionId },
            },
        });

        // Calculate progress percentage
        const totalTests = sectionTests.length;
        const percentage = (completedTests / totalTests) * 100;
        const completed = percentage === 100;

        // Update section progress
        await this.prisma.userSectionProgress.upsert({
            where: {
                userId_sectionId: { userId, sectionId },
            },
            create: {
                userId,
                sectionId,
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

        // If section is completed, update category progress
        if (completed) {
            const section = await this.prisma.section.findUnique({
                where: { id: sectionId },
                include: { category: true },
            });
            await this.categoryProgressService.updateCategoryProgress(userId, section.categoryId);
        }
    }
}