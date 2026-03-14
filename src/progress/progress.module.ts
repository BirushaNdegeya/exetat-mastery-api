import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { UserProgress } from '../models/user-progress.model';
import { Question } from '../models/question.model';

@Module({
  imports: [SequelizeModule.forFeature([UserProgress, Question])],
  providers: [ProgressService],
  controllers: [ProgressController],
  exports: [ProgressService],
})
export class ProgressModule {}
