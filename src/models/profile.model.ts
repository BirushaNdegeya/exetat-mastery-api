import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

interface ProfileCreationAttributes {
  userId: string;
  display_name?: string | null;
  prenom?: string | null;
  postnom?: string | null;
  nom?: string | null;
  matricule?: string | null;
  section?: string | null;
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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  section: string | null;

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
