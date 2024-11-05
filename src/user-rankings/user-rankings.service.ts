import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getUserRankings(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Get weekly ranking
    const weeklyRank = await this.prisma.$queryRaw`
      WITH RankedUsers AS (
        SELECT 
          u.id,
          COALESCE(SUM(x.xp), 0) as total_xp,
          ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(x.xp), 0) DESC) as rank
        FROM "User" u
        LEFT JOIN "Xp" x ON u.id = x.userId AND x.createdAt >= ${oneWeekAgo}
        GROUP BY u.id
      )
      SELECT rank, total_xp
      FROM RankedUsers
      WHERE id = ${userId}
    `;

    // Get monthly ranking
    const monthlyRank = await this.prisma.$queryRaw`
      WITH RankedUsers AS (
        SELECT 
          u.id,
          COALESCE(SUM(x.xp), 0) as total_xp,
          ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(x.xp), 0) DESC) as rank
        FROM "User" u
        LEFT JOIN "Xp" x ON u.id = x.userId AND x.createdAt >= ${oneMonthAgo}
        GROUP BY u.id
      )
      SELECT rank, total_xp
      FROM RankedUsers
      WHERE id = ${userId}
    `;

    // Get all-time ranking
    const allTimeRank = await this.prisma.$queryRaw`
      WITH RankedUsers AS (
        SELECT 
          u.id,
          COALESCE(SUM(c.coin), 0) as total_coins,
          ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(c.coin), 0) DESC) as rank
        FROM "User" u
        LEFT JOIN "Coin" c ON u.id = c.userId
        GROUP BY u.id
      )
      SELECT rank, total_coins
      FROM RankedUsers
      WHERE id = ${userId}
    `;

    return {
      username: user.username,
      avatar: user.avatar,
      weekly: {
        rank: weeklyRank[0]?.rank || 0,
        total_xp: weeklyRank[0]?.total_xp || 0
      },
      monthly: {
        rank: monthlyRank[0]?.rank || 0,
        total_xp: monthlyRank[0]?.total_xp || 0
      },
      allTime: {
        rank: allTimeRank[0]?.rank || 0,
        total_coins: allTimeRank[0]?.total_coins || 0
      }
    };
  }
}