import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { UserRankingsService } from './user-rankings.service';

@Controller('rankings')
export class UserRankingsController {
  constructor(private readonly rankingsService: UserRankingsService) {}

  @Get('weekly')
  async getWeeklyTopUsers(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    return this.rankingsService.getWeeklyTopUsers(limit);
  }

  @Get('monthly')
  async getMonthlyTopUsers(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    return this.rankingsService.getMonthlyTopUsers(limit);
  }

  @Get('all-time')
  async getAllTimeTopUsers(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    return this.rankingsService.getAllTimeTopUsers(limit);
  }
}