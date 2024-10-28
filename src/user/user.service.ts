import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findOne(id: number){
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                Coin: true,
                XP: true,
                Star: true
            }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const totalCoins = user.Coin.reduce((acc, curr) => acc + curr.coin, 0);
        const totalXp = user.XP.reduce((acc, curr) => acc + curr.xp, 0);
        const totalStars = user.Star.reduce((acc, curr) => acc + curr.star, 0);
 
        return { ...user, coins: totalCoins, xp: totalXp, stars: totalStars };
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
