import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { Section } from '../models/section.model';
import { UserRole } from '../models/user-role.model';

@Module({
  imports: [SequelizeModule.forFeature([Section, UserRole])],
  providers: [SectionsService],
  controllers: [SectionsController],
  exports: [SectionsService],
})
export class SectionsModule {}
