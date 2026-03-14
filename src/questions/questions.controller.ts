import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../models/user-role.model';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async getAllQuestions(
    @Query('subject_id') subjectId?: string,
    @Query('year') year?: number,
    @Query('limit') limit: number = 20,
  ) {
    return this.questionsService.getAllQuestions(subjectId, year, limit);
  }

  @Get('random')
  async getRandomQuestions(
    @Query('subject_id') subjectId?: string,
    @Query('limit') limit: number = 7,
  ) {
    return this.questionsService.getRandomQuestions(subjectId, limit);
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: string) {
    return this.questionsService.getQuestionById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.createQuestion(createQuestionDto);
  }

  @Post('bulk')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async createBulkQuestions(@Body() createQuestionDtos: CreateQuestionDto[]) {
    return this.questionsService.createBulkQuestions(createQuestionDtos);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async updateQuestion(
    @Param('id') id: string,
    @Body() updateQuestionDto: CreateQuestionDto,
  ) {
    return this.questionsService.updateQuestion(id, updateQuestionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async deleteQuestion(@Param('id') id: string) {
    await this.questionsService.deleteQuestion(id);
    return { message: 'Question deleted successfully' };
  }
}
