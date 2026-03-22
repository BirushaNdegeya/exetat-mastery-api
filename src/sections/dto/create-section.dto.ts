import { ApiProperty } from '@nestjs/swagger';

export class CreateSectionDto {
  @ApiProperty({
    description: 'Unique section name',
    example: 'Mathematics',
  })
  name: string;
}
