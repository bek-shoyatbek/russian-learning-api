import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRankingsService } from 'src/user-rankings/user-rankings.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService, private readonly userRankingService: UserRankingsService) { }

    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                coins: true,
                xp: true,
                stars: true
            }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const userWithRank = await this.userRankingService.getUserRankings(user.id);

        return userWithRank;

    }

    async findOneByEmail(email: string): Promise<User> {
        return this.prisma.user.findFirst({
            where: {
                email: email
            }
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data: data
        });
    }

    async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            where: {
                id: id
            },
            data: data
        });
    }

    async remove(id: number): Promise<User> {
        return this.prisma.user.delete({
            where: {
                id: id
            }
        });
    }
}
