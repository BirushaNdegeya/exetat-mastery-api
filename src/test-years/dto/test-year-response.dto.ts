import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TestYearResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 2024,
  })
  year: number;

  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid',
  })
  subject_id: string;

  @ApiPropertyOptional({
    description: 'Number of questions inside the year block when available',
    example: 42,
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
