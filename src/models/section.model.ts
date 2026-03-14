import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Subject } from './subject.model';

interface SectionCreationAttributes {
  name: string;
}

@Table({
  tableName: 'sections',
  timestamps: true,
})
export class Section extends Model<Section, SectionCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @HasMany(() => Subject)
  subjects: Subject[];

  declare createdAt: Date;
  declare updatedAt: Date;
}
