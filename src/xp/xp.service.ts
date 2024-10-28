import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class XpService {
    constructor(private prisma: PrismaService) {}

    async create(userId: number, xp: number) {
        return this.prisma.xP.create({
            data: { userId, xp }
        });
    }

    async findAll(userId: number) {
        return this.prisma.xP.findMany({
            where: { userId }
        });
    }

    async findOne(id: number) {
        return this.prisma.xP.findUnique({
            where: { id }
        });
    }

    async update(id: number, xp: number) {
        return this.prisma.xP.update({
            where: { id },
            data: { xp }
        });
    }
}
