import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { TestYear } from './test-year.model';
import { UserProgress } from './user-progress.model';

interface QuestionCreationAttributes {
  question_text: string;
  options: {
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    option5: string;
  };
  correctAnswer: number;
  explanation: string;
  test_year_id: string;
  passage?: string | null;
}

@Table({
  tableName: 'questions',
  timestamps: true,
})
export class Question extends Model<Question, QuestionCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  question_text: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  options: {
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    option5: string;
  };

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  correctAnswer: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  explanation: string;

  @ForeignKey(() => TestYear)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  test_year_id: string;

  @BelongsTo(() => TestYear)
  testYear: TestYear;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  passage: string | null;

  @HasMany(() => UserProgress)
  userProgress: UserProgress[];

  declare createdAt: Date;
  declare updatedAt: Date;
}
