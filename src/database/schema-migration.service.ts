import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { DataTypes, QueryTypes, Sequelize } from 'sequelize';
import { Question } from '../models/question.model';
import { TestYear } from '../models/test-year.model';
import { SUBJECT_BRANCH_TYPES } from '../subjects/dto/create-subject.dto';

interface LegacyQuestionRow {
  id: string;
  subject_id: string;
  year: number;
}

@Injectable()
export class SchemaMigrationService implements OnModuleInit {
  private readonly logger = new Logger(SchemaMigrationService.name);

  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    @InjectModel(TestYear)
    private readonly testYearModel: typeof TestYear,
    @InjectModel(Question)
    private readonly questionModel: typeof Question,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.testYearModel.sync();
    await this.questionModel.sync();
    await this.removeSubjectIconColumn();
    await this.ensureSubjectBranchTypeColumn();
    await this.ensureQuestionTestYearColumn();
    await this.ensureQuestionMetadataColumns();
    await this.backfillTestYearsFromLegacyQuestions();
  }

  private async removeSubjectIconColumn(): Promise<void> {
    const queryInterface = this.sequelize.getQueryInterface();
    const subjectTable = await queryInterface.describeTable('subjects');

    if (subjectTable.icon) {
      await queryInterface.removeColumn('subjects', 'icon');
      this.logger.log('Removed subjects.icon column');
    }
  }

  private async ensureQuestionTestYearColumn(): Promise<void> {
    const queryInterface = this.sequelize.getQueryInterface();
    const questionTable = await queryInterface.describeTable('questions');

    if (!questionTable.test_year_id) {
      await queryInterface.addColumn('questions', 'test_year_id', {
        type: DataTypes.UUID,
        allowNull: true,
      });
      this.logger.log('Added questions.test_year_id column');
    }
  }

  private async ensureSubjectBranchTypeColumn(): Promise<void> {
    const queryInterface = this.sequelize.getQueryInterface();
    const subjectTable = await queryInterface.describeTable('subjects');

    if (!subjectTable.branch_type) {
      await queryInterface.addColumn('subjects', 'branch_type', {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: SUBJECT_BRANCH_TYPES[0],
      });
      this.logger.log('Added subjects.branch_type column');
    }
  }

  private async ensureQuestionMetadataColumns(): Promise<void> {
    const queryInterface = this.sequelize.getQueryInterface();
    const questionTable = await queryInterface.describeTable('questions');

    if (!questionTable.question_type) {
      await queryInterface.addColumn('questions', 'question_type', {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'standard',
      });
      this.logger.log('Added questions.question_type column');
    }

    if (!questionTable.language) {
      await queryInterface.addColumn('questions', 'language', {
        type: DataTypes.STRING,
        allowNull: true,
      });
      this.logger.log('Added questions.language column');
    }

    if (!questionTable.passage_group) {
      await queryInterface.addColumn('questions', 'passage_group', {
        type: DataTypes.STRING,
        allowNull: true,
      });
      this.logger.log('Added questions.passage_group column');
    }
  }

  private async backfillTestYearsFromLegacyQuestions(): Promise<void> {
    const queryInterface = this.sequelize.getQueryInterface();
    const questionTable = await queryInterface.describeTable('questions');

    if (!questionTable.subject_id || !questionTable.year || !questionTable.test_year_id) {
      return;
    }

    const legacyQuestions = await this.sequelize.query<LegacyQuestionRow>(
      `
        SELECT id, subject_id, year
        FROM questions
        WHERE test_year_id IS NULL
          AND subject_id IS NOT NULL
          AND year IS NOT NULL
      `,
      {
        type: QueryTypes.SELECT,
      },
    );

    for (const question of legacyQuestions) {
      const [testYear] = await this.testYearModel.findOrCreate({
        where: {
          subject_id: question.subject_id,
          year: Number(question.year),
        },
        defaults: {
          subject_id: question.subject_id,
          year: Number(question.year),
        },
      });

      await this.sequelize.query(
        `
          UPDATE questions
          SET test_year_id = :testYearId
          WHERE id = :questionId
        `,
        {
          replacements: {
            testYearId: testYear.id,
            questionId: question.id,
          },
        },
      );
    }

    if (legacyQuestions.length > 0) {
      this.logger.log(`Backfilled ${legacyQuestions.length} legacy questions into test_year blocks`);
    }
  }
}
