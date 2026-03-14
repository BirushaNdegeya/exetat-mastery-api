import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { Subject } from '../models/subject.model';
import { Section } from '../models/section.model';
import { UserRole } from '../models/user-role.model';

@Module({
  imports: [SequelizeModule.forFeature([Subject, Section, UserRole])],
  providers: [SubjectsService],
  controllers: [SubjectsController],
  exports: [SubjectsService],
})
export class SubjectsModule {}
