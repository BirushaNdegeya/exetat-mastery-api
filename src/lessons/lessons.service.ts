import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserLesson } from '../models/user-lesson.model';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(UserLesson)
    private userLessonModel: typeof UserLesson,
  ) {}

  async getUserLessons(userId: string): Promise<UserLesson[]> {
    return this.userLessonModel.findAll({
      where: { userId },
    });
  }

  async recordLesson(
    userId: string,
    data: {
      lesson_id: string;
      score?: number;
      completed?: boolean;
    },
  ): Promise<UserLesson> {
    const [lesson, created] = await this.userLessonModel.findOrCreate({
      where: { userId, lesson_id: data.lesson_id },
      defaults: {
        userId,
        lesson_id: data.lesson_id,
        score: data.score ?? undefined,
        completed: data.completed || false,
      },
    });

    if (created) {
      if (data.completed) {
        await lesson.update({
          completed_at: new Date(),
        });
      }
    } else {
      await lesson.update({
        score: data.score !== undefined ? data.score : lesson.score,
        completed: data.completed !== undefined ? data.completed : lesson.completed,
        completed_at: data.completed ? new Date() : lesson.completed_at,
      });
    }

    return lesson;
  }

  async updateLesson(
    userId: string,
    lessonId: string,
    data: {
      score?: number;
      completed?: boolean;
    },
  ): Promise<UserLesson> {
    const lesson = await this.userLessonModel.findOne({
      where: { userId, lesson_id: lessonId },
    });

    if (!lesson) {
      return this.recordLesson(userId, { lesson_id: lessonId, ...data });
    }

    await lesson.update({
      score: data.score !== undefined ? data.score : lesson.score,
      completed: data.completed !== undefined ? data.completed : lesson.completed,
      completed_at: data.completed ? new Date() : lesson.completed_at,
    });

    return lesson;
  }
}
