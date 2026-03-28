import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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

  @ApiPropertyOptional({ example: 'MECANIQUE GENERALE' })
  @IsOptional()
  @IsString()
  section?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.png' })
  @IsOptional()
  @IsString()
  avatar_url?: string;
}
