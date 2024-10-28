import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { SectionModule } from './section/section.module';
import { UserRankingsModule } from './user-rankings/user-rankings.module';
import { StarModule } from './star/star.module';
import { XpModule } from './xp/xp.module';
import { CoinModule } from './coin/coin.module';
@Module({
  imports: [UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    SectionModule,
    UserRankingsModule,
    StarModule,
    XpModule,
    CoinModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
