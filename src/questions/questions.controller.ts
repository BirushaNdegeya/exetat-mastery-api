import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../models/user-role.model';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionResponseDto } from './dto/question-response.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';

@ApiTags('Questions')
@Controller()
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('questions')
  @ApiOperation({
    summary: 'List questions',
    description: 'Returns questions with optional filtering by subject, year block, exam year, and text search.',
  })
  @ApiQuery({
    name: 'subject_id',
    required: false,
    description: 'Filter by subject ID',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiQuery({
    name: 'test_year_id',
    required: false,
    description: 'Filter by year block ID',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiQuery({
    name: 'year',
    required: false,
    description: 'Filter by numeric exam year through the year block',
    schema: { type: 'number', example: 2024 },
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search inside question text',
    schema: { type: 'string', example: 'capitale' },
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    schema: { type: 'number', example: 1, default: 1 },
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Maximum number of questions to return per page',
    schema: { type: 'number', example: 20, default: 20 },
  })
  @ApiResponse({
    status: 200,
    description: 'Questions returned successfully',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            question_text: 'Quelle est la capitale de la RDC ?',
            options: ['Kinshasa', 'Lubumbashi', 'Goma', 'Matadi'],
            correct_answer: 'Kinshasa',
            explanation: 'Kinshasa est la capitale.',
            test_year_id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            passage: null,
          },
        ],
        meta: {
          total: 1,
          page: 1,
          limit: 20,
        },
      },
    },
  })
  async getAllQuestions(
    @Query('subject_id') subjectId?: string,
    @Query('year') year?: number,
    @Query('test_year_id') testYearId?: string,
    @Query('limit') limit: number = 20,
    @Query('page') page: number = 1,
    @Query('search') search?: string,
  ) {
    return this.questionsService.getAllQuestions(subjectId, year, testYearId, Number(limit), Number(page), search);
  }

  @Get('questions/random')
  @ApiOperation({
    summary: 'Get random questions',
    description: 'Returns a shuffled question subset, optionally filtered by subject or year.',
  })
  @ApiQuery({
    name: 'subject_id',
    required: false,
    description: 'Filter random questions by subject ID',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiQuery({
    name: 'year',
    required: false,
    description: 'Filter random questions by exam year',
    schema: { type: 'number', example: 2024 },
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Maximum number of random questions to return',
    schema: { type: 'number', example: 7, default: 7 },
  })
  @ApiResponse({
    status: 200,
    description: 'Random questions returned successfully',
    type: QuestionResponseDto,
    isArray: true,
  })
  async getRandomQuestions(
    @Query('subject_id') subjectId?: string,
    @Query('year') year?: number,
    @Query('limit') limit: number = 7,
  ) {
    return this.questionsService.getRandomQuestions(subjectId, year, Number(limit));
  }

  @Get('questions/:id')
  @ApiOperation({
    summary: 'Get a question by ID',
    description: 'Returns one question with its year block and subject context.',
  })
  @ApiParam({
    name: 'id',
    description: 'Question identifier',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiResponse({
    status: 200,
    description: 'Question returned successfully',
    type: QuestionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async getQuestionById(@Param('id') id: string) {
    return this.questionsService.getQuestionById(id);
  }

  @Get('years/:yearId/questions')
  @ApiOperation({
    summary: 'List questions for a year block',
    description: 'Returns paginated questions that belong to the selected year block.',
  })
  @ApiParam({
    name: 'yearId',
    description: 'Year block identifier',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    schema: { type: 'number', example: 1, default: 1 },
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Maximum number of questions to return per page',
    schema: { type: 'number', example: 20, default: 20 },
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search inside question text',
    schema: { type: 'string', example: 'capitale' },
  })
  @ApiResponse({
    status: 200,
    description: 'Questions returned successfully',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            question_text: 'Quelle est la capitale de la RDC ?',
            options: ['Kinshasa', 'Lubumbashi', 'Goma', 'Matadi'],
            correct_answer: 'Kinshasa',
            explanation: 'Kinshasa est la capitale.',
            test_year_id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            passage: null,
          },
        ],
        meta: {
          total: 1,
          page: 1,
          limit: 20,
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Year block not found' })
  async getQuestionsByYear(
    @Param('yearId') yearId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('search') search?: string,
  ) {
    return this.questionsService.getQuestionsByYear(yearId, Number(page), Number(limit), search);
  }

  @Post('years/:yearId/questions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a question in a year block',
    description: 'Creates a question under the selected year block. The request body should match the question schema.',
  })
  @ApiParam({
    name: 'yearId',
    description: 'Year block identifier',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        question_text: { type: 'string', example: 'Quelle est la capitale de la RDC ?' },
        options: {
          type: 'array',
          items: { type: 'string' },
          example: ['Kinshasa', 'Lubumbashi', 'Goma', 'Matadi'],
        },
        correct_answer: { type: 'string', example: 'Kinshasa' },
        explanation: { type: 'string', example: 'Kinshasa est la capitale.' },
        passage: { type: 'string', nullable: true, example: null },
      },
      required: ['question_text', 'options', 'correct_answer', 'explanation'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Question created successfully',
    type: QuestionResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Year block not found' })
  async createQuestionForYear(
    @Param('yearId') yearId: string,
    @Body() createQuestionDto: Omit<CreateQuestionDto, 'test_year_id'>,
  ) {
    return this.questionsService.createQuestionForYear(yearId, createQuestionDto);
  }

  @Post('questions/bulk')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create multiple questions',
    description: 'Bulk creates questions. Each item must provide a valid year block ID.',
  })
  @ApiBody({ type: CreateQuestionDto, isArray: true })
  @ApiResponse({
    status: 201,
    description: 'Questions created successfully',
    type: QuestionResponseDto,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async createBulkQuestions(@Body() createQuestionDtos: CreateQuestionDto[]) {
    return this.questionsService.createBulkQuestions(createQuestionDtos);
  }

  @Put('questions/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update a question',
    description: 'Updates an existing question. You can also move the question to another year block by sending a new test_year_id.',
  })
  @ApiParam({
    name: 'id',
    description: 'Question identifier',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiBody({ type: UpdateQuestionDto })
  @ApiResponse({
    status: 200,
    description: 'Question updated successfully',
    type: QuestionResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Question or year block not found' })
  async updateQuestion(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.updateQuestion(id, updateQuestionDto);
  }

  @Delete('questions/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete a question',
    description: 'Deletes a single question from a year block.',
  })
  @ApiParam({
    name: 'id',
    description: 'Question identifier',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiResponse({
    status: 200,
    description: 'Question deleted successfully',
    schema: {
      example: {
        message: 'Question deleted successfully',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async deleteQuestion(@Param('id') id: string) {
    await this.questionsService.deleteQuestion(id);
    return { message: 'Question deleted successfully' };
  }
}
