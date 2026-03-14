import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from '../models/question.model';
import { Subject } from '../models/subject.model';
import { Op } from 'sequelize';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question)
    private questionModel: typeof Question,
  ) {}

  async getAllQuestions(
    subjectId?: string,
    year?: number,
    limit: number = 20,
  ): Promise<Question[]> {
    const where: any = {};
    if (subjectId) where.subject_id = subjectId;
    if (year) where.year = year;

    return this.questionModel.findAll({
      where,
      include: [Subject],
      limit,
    });
  }

  async getRandomQuestions(
    subjectId?: string,
    limit: number = 7,
  ): Promise<Question[]> {
    const where: any = {};
    if (subjectId) where.subject_id = subjectId;

    const questions = await this.questionModel.findAll({
      where,
      include: [Subject],
    });

    // Shuffle and limit
    return questions.sort(() => 0.5 - Math.random()).slice(0, limit);
  }

  async getQuestionById(id: string): Promise<Question> {
    const question = await this.questionModel.findByPk(id, {
      include: [Subject],
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }

  async createQuestion(data: {
    question_text: string;
    options: string[];
    correct_answer: string;
    explanation: string;
    subject_id: string;
    year: number;
    passage?: string | null;
  }): Promise<Question> {
    return this.questionModel.create(data);
  }

  async createBulkQuestions(
    data: Array<{
      question_text: string;
      options: string[];
      correct_answer: string;
      explanation: string;
      subject_id: string;
      year: number;
      passage?: string | null;
    }>,
  ): Promise<Question[]> {
    return this.questionModel.bulkCreate(data);
  }

  async updateQuestion(
    id: string,
    data: {
      question_text?: string;
      options?: string[];
      correct_answer?: string;
      explanation?: string;
      subject_id?: string;
      year?: number;
      passage?: string | null;
    },
  ): Promise<Question> {
    const question = await this.getQuestionById(id);
    await question.update(data);
    return question;
  }

  async deleteQuestion(id: string): Promise<void> {
    const question = await this.getQuestionById(id);
    await question.destroy();
  }
}
