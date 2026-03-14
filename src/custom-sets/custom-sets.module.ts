import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomSetsService } from './custom-sets.service';
import { CustomQuestionsService } from './custom-questions.service';
import { CustomSetsController } from './custom-sets.controller';
import { CustomQuestionSet } from '../models/custom-question-set.model';
import { CustomQuestion } from '../models/custom-question.model';

@Module({
  imports: [SequelizeModule.forFeature([CustomQuestionSet, CustomQuestion])],
  providers: [CustomSetsService, CustomQuestionsService],
  controllers: [CustomSetsController],
  exports: [CustomSetsService, CustomQuestionsService],
})
export class CustomSetsModule {}
