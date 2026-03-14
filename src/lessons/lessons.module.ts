import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { UserLesson } from '../models/user-lesson.model';

@Module({
  imports: [SequelizeModule.forFeature([UserLesson])],
  providers: [LessonsService],
  controllers: [LessonsController],
  exports: [LessonsService],
})
export class LessonsModule {}
