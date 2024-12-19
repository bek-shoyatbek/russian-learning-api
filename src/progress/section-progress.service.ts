import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SectionProgressService {
    constructor(private prisma: PrismaService) { }

    async getSectionProgress(userId: number, sectionId: number) {
        const progress = await this.prisma.userSectionProgress.findUnique({
            where: {
                userId_sectionId: { userId, sectionId },
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

    async getAllSectionProgress(userId: number) {
        return this.prisma.userSectionProgress.findMany({
            where: { userId },
            include: {
                section: {
                    select: {
                        title: true,
                        category: true,
                    },
                },
            },
        });
    }
}