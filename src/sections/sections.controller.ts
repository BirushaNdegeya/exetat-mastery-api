import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../models/user-role.model';
import { CreateSectionDto } from './dto/create-section.dto';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get()
  async getAllSections() {
    return this.sectionsService.getAllSections();
  }

  @Get('count')
  async getSectionCount() {
    return { count: await this.sectionsService.getSectionCount() };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async createSection(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionsService.createSection(createSectionDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async updateSection(
    @Param('id') id: string,
    @Body() updateSectionDto: CreateSectionDto,
  ) {
    return this.sectionsService.updateSection(id, updateSectionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async deleteSection(@Param('id') id: string) {
    await this.sectionsService.deleteSection(id);
    return { message: 'Section deleted successfully' };
  }
}
