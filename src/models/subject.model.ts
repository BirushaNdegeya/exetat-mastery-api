import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Section } from './section.model';
import { TestYear } from './test-year.model';

interface SubjectCreationAttributes {
  name: string;
  description?: string | null;
  section_id: string;
}

@Table({
  tableName: 'subjects',
  timestamps: true,
})
export class Subject extends Model<Subject, SubjectCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string | null;

  @ForeignKey(() => Section)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  section_id: string;

  @BelongsTo(() => Section)
  section: Section;

  @HasMany(() => TestYear)
  testYears: TestYear[];

  declare createdAt: Date;
  declare updatedAt: Date;
}