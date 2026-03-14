import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RecordLessonDto, UpdateLessonDto } from './dto/lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserLessons(@CurrentUser() user: any) {
    return this.lessonsService.getUserLessons(user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async recordLesson(
    @CurrentUser() user: any,
    @Body() recordLessonDto: RecordLessonDto,
  ) {
    return this.lessonsService.recordLesson(user.id, recordLessonDto);
  }

  @Patch(':lessonId')
  @UseGuards(JwtAuthGuard)
  async updateLesson(
    @CurrentUser() user: any,
    @Param('lessonId') lessonId: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.updateLesson(user.id, lessonId, updateLessonDto);
  }
}
