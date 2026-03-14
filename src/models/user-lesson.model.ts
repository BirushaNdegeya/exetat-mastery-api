import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

interface UserLessonCreationAttributes {
  userId: string;
  lesson_id: string;
  completed?: boolean;
  score?: number;
}

@Table({
  tableName: 'user_lessons',
  timestamps: true,
})
export class UserLesson extends Model<UserLesson, UserLessonCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lesson_id: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  completed: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  score: number | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  completed_at: Date | null;

  declare createdAt: Date;
  declare updatedAt: Date;
}
