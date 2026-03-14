import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StreaksService } from './streaks.service';
import { StreaksController } from './streaks.controller';
import { UserStreak } from '../models/user-streak.model';

@Module({
  imports: [SequelizeModule.forFeature([UserStreak])],
  providers: [StreaksService],
  controllers: [StreaksController],
  exports: [StreaksService],
})
export class StreaksModule {}
