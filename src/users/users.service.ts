import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findOne(id: number): Promise<User> {
        return this.prisma.user.findUnique({
            where: {
                id: id
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
