import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Subject } from './subject.model';
import { UserProgress } from './user-progress.model';

interface QuestionCreationAttributes {
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  subject_id: string;
  year: number;
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
  options: string[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  correct_answer: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  explanation: string;

  @ForeignKey(() => Subject)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  subject_id: string;

  @BelongsTo(() => Subject)
  subject: Subject;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year: number;

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
