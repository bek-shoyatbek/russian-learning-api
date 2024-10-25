import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRankingsService {
  constructor(private prisma: PrismaService) {}

  async getWeeklyTopUsers(limit: number = 10) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return this.prisma.$queryRaw`
      SELECT 
        u.id,
        u.username,
        COUNT(r.id) as reward_count,
        COALESCE(SUM(r.coins), 0) as total_coins
      FROM "User" u
      LEFT JOIN "Reward" r ON u.id = r.userId
      WHERE r.createdAt >= ${oneWeekAgo}
      GROUP BY u.id, u.username
      ORDER BY total_coins DESC
      LIMIT ${limit}
    `;
  }

  async getMonthlyTopUsers(limit: number = 10) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return this.prisma.$queryRaw`
      SELECT 
        u.id,
        u.username,
        COUNT(r.id) as reward_count,
        COALESCE(SUM(r.coins), 0) as total_coins
      FROM "User" u
      LEFT JOIN "Reward" r ON u.id = r.userId
      WHERE r.createdAt >= ${oneMonthAgo}
      GROUP BY u.id, u.username
      ORDER BY total_coins DESC
      LIMIT ${limit}
    `;
  }

  async getAllTimeTopUsers(limit: number = 10) {
    return this.prisma.$queryRaw`
      SELECT 
        u.id,
        u.username,
        COUNT(r.id) as reward_count,
        COALESCE(SUM(r.coins), 0) as total_coins
      FROM "User" u
      LEFT JOIN "Reward" r ON u.id = r.userId
      GROUP BY u.id, u.username
      ORDER BY total_coins DESC
      LIMIT ${limit}
    `;
  }
}