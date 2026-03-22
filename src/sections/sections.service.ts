import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Section } from '../models/section.model';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section)
    private sectionModel: typeof Section,
  ) {}

  async getAllSections(): Promise<Section[]> {
    return this.sectionModel.findAll();
  }

  async getSectionCount(): Promise<number> {
    return this.sectionModel.count();
  }

  async getSectionById(id: string): Promise<Section> {
    const section = await this.sectionModel.findByPk(id);
    if (!section) {
      throw new NotFoundException('Section introuvable');
    }
    return section;
  }

  async createSection(data: { name: string }): Promise<Section> {
    return this.sectionModel.create(data);
  }

  async updateSection(id: string, data: { name: string }): Promise<Section> {
    const section = await this.getSectionById(id);
    await section.update(data);
    return section;
  }

  async deleteSection(id: string): Promise<void> {
    const section = await this.getSectionById(id);
    await section.destroy();
  }
}
