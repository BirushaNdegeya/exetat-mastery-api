import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../models/user-role.model';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectResponseDto } from './dto/subject-response.dto';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @ApiOperation({
    summary: 'List subjects',
    description: 'Returns all subjects. You can optionally filter the list by section.',
  })
  @ApiQuery({
    name: 'section_id',
    required: false,
    description: 'Filter subjects by section ID',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiResponse({
    status: 200,
    description: 'Subjects returned successfully',
    type: SubjectResponseDto,
    isArray: true,
  })
  async getAllSubjects(@Query('section_id') sectionId?: string) {
    return this.subjectsService.getAllSubjects(sectionId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a subject by ID',
    description: 'Returns a single subject with metadata useful for the admin hierarchy.',
  })
  @ApiParam({
    name: 'id',
    description: 'Subject identifier',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiResponse({
    status: 200,
    description: 'Subject returned successfully',
    type: SubjectResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  async getSubjectById(@Param('id') id: string) {
    return this.subjectsService.getSubjectById(id);
  }

  @Get(':id/question-count')
  @ApiOperation({
    summary: 'Get the total number of questions for a subject',
    description: 'Counts questions across all year blocks attached to the subject.',
  })
  @ApiParam({
    name: 'id',
    description: 'Subject identifier',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiResponse({
    status: 200,
    description: 'Question count returned successfully',
    schema: {
      example: {
        count: 120,
      },
    },
  })
  async getQuestionCount(@Param('id') id: string) {
    const count = await this.subjectsService.getQuestionCount(id);
    return { count };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a subject',
    description: 'Creates a new subject that will contain year blocks and their questions.',
  })
  @ApiBody({ type: CreateSubjectDto })
  @ApiResponse({
    status: 201,
    description: 'Subject created successfully',
    type: SubjectResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async createSubject(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.createSubject(createSubjectDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update a subject',
    description: 'Updates the editable fields of an existing subject.',
  })
  @ApiParam({
    name: 'id',
    description: 'Subject identifier',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiBody({ type: CreateSubjectDto })
  @ApiResponse({
    status: 200,
    description: 'Subject updated successfully',
    type: SubjectResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  async updateSubject(
    @Param('id') id: string,
    @Body() updateSubjectDto: CreateSubjectDto,
  ) {
    return this.subjectsService.updateSubject(id, updateSubjectDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete a subject',
    description: 'Deletes a subject. Existing year blocks and questions should be cleaned up before removal.',
  })
  @ApiParam({
    name: 'id',
    description: 'Subject identifier',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiResponse({
    status: 200,
    description: 'Subject deleted successfully',
    schema: {
      example: {
        message: 'Subject deleted successfully',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  async deleteSubject(@Param('id') id: string) {
    await this.subjectsService.deleteSubject(id);
    return { message: 'Subject deleted successfully' };
  }
}
