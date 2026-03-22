import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QuestionResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 'Quelle est la capitale de la RDC ?',
  })
  question_text: string;

  @ApiProperty({
    type: [String],
    example: ['Kinshasa', 'Lubumbashi', 'Goma', 'Matadi'],
  })
  options: string[];

  @ApiProperty({
    example: 'Kinshasa',
  })
  correct_answer: string;

  @ApiProperty({
    example: 'Kinshasa est la capitale de la Republique Democratique du Congo.',
  })
  explanation: string;

  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid',
  })
  test_year_id: string;

  @ApiPropertyOptional({
    example: 'Lisez le passage suivant avant de repondre.',
    nullable: true,
  })
  passage?: string | null;

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
