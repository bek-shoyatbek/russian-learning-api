import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoinService {
    constructor(private prisma: PrismaService) {}

    async create(userId: number, coin: number) {
        return this.prisma.coin.create({
            data: { userId, coin }
        });
    }

    async findAll(userId: number) {
        return this.prisma.coin.findMany({
            where: { userId }
        });
    }


    async update(id: number, coin: number) {
        return this.prisma.coin.update({
            where: { id },
            data: { coin }
        });
    }

}
