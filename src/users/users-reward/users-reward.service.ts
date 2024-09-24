import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, UserReward } from '@prisma/client';

@Injectable()
export class UsersRewardService {

    constructor(private readonly prisma: PrismaService) { }


    async findAll(userId: number): Promise<UserReward[]> {
        return this.prisma.userReward.findMany({ where: { userId } });
    }

    async findOne(rewardId: number): Promise<UserReward> {
        return this.prisma.userReward.findUnique({ where: { id: rewardId } });
    }

    async create(data: Prisma.UserRewardCreateInput): Promise<UserReward> {
        return this.prisma.userReward.create({ data });
    }

    async update(rewardId: number, data: Partial<UserReward>): Promise<UserReward> {
        return this.prisma.userReward.update({ where: { id: rewardId }, data });
    }

    async remove(rewardId: number): Promise<any> {
        return this.prisma.userReward.delete({ where: { id: rewardId } });
    }
}
