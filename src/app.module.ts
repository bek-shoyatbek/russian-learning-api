import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { RewardModule } from './reward/reward.module';
import { SectionModule } from './section/section.module';

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    RewardModule,
    SectionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
