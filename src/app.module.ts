import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { RewardModule } from './reward/reward.module';
<<<<<<< HEAD
import { SectionModule } from './section/section.module';
=======
>>>>>>> a9bc5e745afe403438e052e948fee081965ca5ab

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
<<<<<<< HEAD
    RewardModule,
    SectionModule
=======
    RewardModule
>>>>>>> a9bc5e745afe403438e052e948fee081965ca5ab
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
