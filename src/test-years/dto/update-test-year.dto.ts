import { PartialType } from '@nestjs/swagger';
import { CreateTestYearDto } from './create-test-year.dto';

export class UpdateTestYearDto extends PartialType(CreateTestYearDto) {}
