import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRankingsService {
  constructor(private prisma: PrismaService) { }

  async getWeeklyTopUsers(limit: number = 10) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const users = await this.prisma.$queryRaw`
      SELECT 
        u.id,
        u.username,
        u.avatar as avatar,
        COUNT(x.id) as xp_count,
        COALESCE(SUM(x.xp), 0) as total_xp
      FROM "User" u
      LEFT JOIN "Xp" x ON u.id = x.userId
      WHERE x.createdAt >= ${oneWeekAgo}
      GROUP BY u.id, u.username
      ORDER BY total_xp DESC
      LIMIT ${limit}
    `;

    return users;
  }

  async getMonthlyTopUsers(limit: number = 10) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return this.prisma.$queryRaw`
      SELECT 
        u.id,
        u.username,
        u.avatar as avatar,
        COUNT(x.id) as xp_count,
        COALESCE(SUM(x.xp), 0) as total_xp
      FROM "User" u
      LEFT JOIN "Xp" x ON u.id = x.userId
      WHERE x.createdAt >= ${oneMonthAgo}
      GROUP BY u.id, u.username
      ORDER BY total_xp DESC
      LIMIT ${limit}
    `;
  }

  async getAllTimeTopUsers(limit: number = 10) {
    return this.prisma.$queryRaw`
      SELECT 
        u.id,
        u.username,
        u.avatar as avatar,
        COUNT(c.id) as coin_count,
        COALESCE(SUM(c.coin), 0) as total_coins
      FROM "User" u
      LEFT JOIN "Coin" c ON u.id = c.userId
      GROUP BY u.id, u.username
      ORDER BY total_coins DESC
      LIMIT ${limit}
    `;
  }
}