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
import { SubjectsService } from './subjects.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../models/user-role.model';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  async getAllSubjects(@Query('section_id') sectionId?: string) {
    return this.subjectsService.getAllSubjects(sectionId);
  }

  @Get(':id')
  async getSubjectById(@Param('id') id: string) {
    return this.subjectsService.getSubjectById(id);
  }

  @Get(':id/question-count')
  async getQuestionCount(@Param('id') id: string) {
    const count = await this.subjectsService.getQuestionCount(id);
    return { count };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async createSubject(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.createSubject(createSubjectDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async updateSubject(
    @Param('id') id: string,
    @Body() updateSubjectDto: CreateSubjectDto,
  ) {
    return this.subjectsService.updateSubject(id, updateSubjectDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async deleteSubject(@Param('id') id: string) {
    await this.subjectsService.deleteSubject(id);
    return { message: 'Subject deleted successfully' };
  }
}
