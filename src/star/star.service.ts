import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StarService {
    constructor(private prisma: PrismaService) {}

    async create(userId: number, star: number) {
        return this.prisma.star.create({
            data: { userId, star }
        });
    }

    async findAll(userId: number) {
        return this.prisma.star.findMany({
            where: { userId }
        });
    }


    async update(id: number, star: number) {
        return this.prisma.star.update({
            where: { id },
            data: { star }
        });
    }

}
