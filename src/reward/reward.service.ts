import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Reward } from '@prisma/client';

@Injectable()
export class RewardService {

    constructor(private readonly prisma: PrismaService) { }


    async findAll(): Promise<Reward[]> {
        return this.prisma.reward.findMany();
    }

    async findOne(rewardId: number): Promise<Reward> {
        return this.prisma.reward.findUnique({ where: { id: rewardId } });
    }

    async create(data: Prisma.RewardCreateInput): Promise<Reward> {
        return this.prisma.reward.create({ data });
    }

    async update(rewardId: number, data: Partial<Reward>): Promise<Reward> {
        return this.prisma.reward.update({ where: { id: rewardId }, data });
    }

    async remove(rewardId: number): Promise<any> {
        return this.prisma.reward.delete({ where: { id: rewardId } });
    }
}
