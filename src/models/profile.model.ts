import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';
import { Section } from './section.model';

interface ProfileCreationAttributes {
  userId: string;
  display_name?: string | null;
  prenom?: string | null;
  postnom?: string | null;
  nom?: string | null;
  matricule?: string | null;
  /** @deprecated Kept for legacy rows; prefer section_id */
  section?: string | null;
  section_id?: string | null;
  avatar_url?: string | null;
}

@Table({
  tableName: 'profiles',
  timestamps: true,
})
export class Profile extends Model<Profile, ProfileCreationAttributes> {
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
    unique: true,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  display_name: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  prenom: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  postnom: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  nom: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  matricule: string | null;

  /** Legacy display copy; canonical link is section_id */
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  section: string | null;

  @ForeignKey(() => Section)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  section_id: string | null;

  @BelongsTo(() => Section)
  sectionEntity: Section;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar_url: string | null;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  xp: number;

  declare createdAt: Date;
  declare updatedAt: Date;
}
