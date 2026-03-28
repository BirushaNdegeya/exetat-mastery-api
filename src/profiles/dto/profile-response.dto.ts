import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ format: 'email', example: 'student@example.com' })
  email: string;

  @ApiPropertyOptional({ example: 'Esther', nullable: true })
  display_name: string | null;

  @ApiPropertyOptional({ example: 'Esther', nullable: true })
  prenom: string | null;

  @ApiPropertyOptional({ example: 'Kasongo', nullable: true })
  postnom: string | null;

  @ApiPropertyOptional({ example: 'Mwamba', nullable: true })
  nom: string | null;

  @ApiPropertyOptional({ example: '2024/KINSHASA/001', nullable: true })
  matricule: string | null;

  @ApiPropertyOptional({ example: 'MECANIQUE GENERALE', nullable: true })
  section: string | null;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.png', nullable: true })
  avatar_url: string | null;

  @ApiProperty({ example: 0 })
  xp: number;

  @ApiProperty({ type: String, format: 'date-time' })
  created_at: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updated_at: Date;
}
