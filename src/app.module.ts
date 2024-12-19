import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { SectionModule } from './section/section.module';
import { UserRankingsModule } from './user-rankings/user-rankings.module';
import { StarModule } from './star/star.module';
import { XpModule } from './xp/xp.module';
import { CoinModule } from './coin/coin.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WordsModule } from './words/words.module';
import { ExcelSeederModule } from './excel-seeder/excel-seeder.module';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    SectionModule,
    UserRankingsModule,
    StarModule,
    XpModule,
    CoinModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    WordsModule,
    ExcelSeederModule
  ],
  controllers: [AppController],
})
export class AppModule { }
