import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Question text shown to the learner',
    example: 'What is the capital city of the Democratic Republic of the Congo?',
  })
  question_text: string;

  @ApiProperty({
    description: 'List of answer options',
    example: ['Kinshasa', 'Lubumbashi', 'Goma', 'Matadi'],
    type: [String],
  })
  options: string[];

  @ApiProperty({
    description: 'Correct answer from the options list',
    example: 'Kinshasa',
  })
  correct_answer: string;

  @ApiProperty({
    description: 'Explanation displayed after answering',
    example: 'Kinshasa is the capital and largest city of the DRC.',
  })
  explanation: string;

  @ApiProperty({
    description: 'Associated year block ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  test_year_id: string;

  @ApiPropertyOptional({
    description: 'Optional reading passage attached to the question',
    example: 'Read the following paragraph before answering the question.',
    nullable: true,
  })
  passage?: string | null;
}
