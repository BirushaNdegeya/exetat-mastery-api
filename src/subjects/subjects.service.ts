import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from '../models/subject.model';
import { Question } from '../models/question.model';
import { Section } from '../models/section.model';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject)
    private subjectModel: typeof Subject,
  ) {}

  async getAllSubjects(sectionId?: string): Promise<Subject[]> {
    const where = sectionId ? { section_id: sectionId } : {};
    return this.subjectModel.findAll({
      where,
      include: [Section],
    });
  }

  async getSubjectById(id: string): Promise<Subject> {
    const subject = await this.subjectModel.findByPk(id, {
      include: [Section],
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    return subject;
  }

  async getQuestionCount(subjectId: string): Promise<number> {
    return Question.count({
      where: { subject_id: subjectId },
    });
  }

  async createSubject(data: {
    name: string;
    icon: string;
    description?: string | null;
    section_id?: string | null;
  }): Promise<Subject> {
    return this.subjectModel.create(data);
  }

  async updateSubject(
    id: string,
    data: {
      name?: string;
      icon?: string;
      description?: string | null;
      section_id?: string | null;
    },
  ): Promise<Subject> {
    const subject = await this.getSubjectById(id);
    await subject.update(data);
    return subject;
  }

  async deleteSubject(id: string): Promise<void> {
    const subject = await this.getSubjectById(id);
    await subject.destroy();
  }
}
