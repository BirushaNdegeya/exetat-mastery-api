import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator';

/** Body for PATCH /api/v1/profiles/me — all fields optional; omit keys you do not want to change. */
export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Esther' })
  @IsOptional()
  @IsString()
  display_name?: string;

  @ApiPropertyOptional({ example: 'Esther' })
  @IsOptional()
  @IsString()
  prenom?: string;

  @ApiPropertyOptional({ example: 'Kasongo' })
  @IsOptional()
  @IsString()
  postnom?: string;

  @ApiPropertyOptional({ example: 'Mwamba' })
  @IsOptional()
  @IsString()
  nom?: string;

  @ApiPropertyOptional({ example: '2024/KINSHASA/001' })
  @IsOptional()
  @IsString()
  matricule?: string;

  @ApiPropertyOptional({
    format: 'uuid',
    description: 'Section id from GET /sections. Send null to clear.',
    nullable: true,
  })
  @IsOptional()
  @ValidateIf((_, v) => v !== null && v !== undefined)
  @IsUUID('4')
  section_id?: string | null;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.png' })
  @IsOptional()
  @IsString()
  avatar_url?: string;
}
