import { Module } from "@nestjs/common";
import { TestProgressService } from "./test-progress.service";
import { SectionProgressService } from "./section-progress.service";
import { CategoryProgressService } from "./category-progress.service";
import { UserProgressService } from "./user-progress.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    providers: [
        TestProgressService,
        SectionProgressService,
        CategoryProgressService,
        UserProgressService,
        PrismaService,
    ],
    exports: [UserProgressService],
})
export class ProgressModule { }