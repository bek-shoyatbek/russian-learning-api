import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TestProgressService } from "./test-progress.service";
import { SectionProgressService } from "./section-progress.service";
import { CategoryProgressService } from "./category-progress.service";

@Injectable()
export class UserProgressService {
    constructor(
        private prisma: PrismaService,
        private testProgressService: TestProgressService,
        private sectionProgressService: SectionProgressService,
        private categoryProgressService: CategoryProgressService,
    ) { }

    async getUserOverallProgress(userId: number) {
        const [
            totalTests,
            completedTests,
            categoryProgress,
            totalXP,
            totalStars,
        ] = await Promise.all([
            this.prisma.test.count(),
            this.prisma.userTestCompletion.count({ where: { userId } }),
            this.prisma.userCategoryProgress.findMany({ where: { userId } }),
            this.prisma.xP.aggregate({ where: { userId }, _sum: { xp: true } }),
            this.prisma.star.aggregate({ where: { userId }, _sum: { star: true } }),
        ]);

        const overallPercentage = (completedTests / totalTests) * 100;
        const completedCategories = categoryProgress.filter(p => p.completed).length;

        return {
            testCompletion: {
                total: totalTests,
                completed: completedTests,
                percentage: overallPercentage,
            },
            categoryCompletion: {
                total: categoryProgress.length,
                completed: completedCategories,
            },
            totalXP: totalXP._sum.xp || 0,
            totalStars: totalStars._sum.star || 0,
        };
    }
}