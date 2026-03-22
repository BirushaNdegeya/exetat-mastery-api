import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubjectResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 'Culture Generale',
  })
  name: string;

  @ApiProperty({
    example: 'book-open',
  })
  icon: string;

  @ApiPropertyOptional({
    example: 'Questions de culture generale organisees par annee',
    nullable: true,
  })
  description?: string | null;

  @ApiPropertyOptional({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid',
    nullable: true,
  })
  section_id?: string | null;

  @ApiPropertyOptional({
    description: 'Total number of year blocks attached to the subject when available',
    example: 3,
  })
  year_count?: number;

  @ApiPropertyOptional({
    description: 'Total number of questions inside the subject when available',
    example: 120,
  })
  question_count?: number;

  @ApiProperty({
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;
}
