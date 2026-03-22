import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty({
    description: 'Subject name displayed to the admin and learners',
    example: 'Culture Generale',
  })
  name: string;

  @ApiProperty({
    description: 'Icon identifier used by the client UI',
    example: 'globe',
  })
  icon: string;

  @ApiPropertyOptional({
    description: 'Optional helper description shown in the admin UI',
    example: 'Gerer les questions par categorie et par annee',
    nullable: true,
  })
  description?: string | null;

  @ApiPropertyOptional({
    description: 'Optional parent section ID',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid',
    nullable: true,
  })
  section_id?: string | null;
}
