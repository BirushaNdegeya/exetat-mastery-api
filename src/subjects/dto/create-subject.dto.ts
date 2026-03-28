import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty({
    description: 'Subject name displayed inside a section. A subject groups its test-year blocks and their questions.',
    example: 'Culture Generale',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Optional description explaining what kinds of questions live under this subject across its test years.',
    example: 'Gerer les questions par categorie et par annee',
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    description: 'Required parent section ID. Flow: section -> subject -> test year blocks -> questions.',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid',
  })
  section_id: string;
}
