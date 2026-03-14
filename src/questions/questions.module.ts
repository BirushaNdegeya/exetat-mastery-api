import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question } from '../models/question.model';
import { Subject } from '../models/subject.model';
import { UserRole } from '../models/user-role.model';

@Module({
  imports: [SequelizeModule.forFeature([Question, Subject, UserRole])],
  providers: [QuestionsService],
  controllers: [QuestionsController],
  exports: [QuestionsService],
})
export class QuestionsModule {}
