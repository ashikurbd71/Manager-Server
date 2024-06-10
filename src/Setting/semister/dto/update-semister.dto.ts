import { PartialType } from '@nestjs/mapped-types';
import { CreateSemisterDto } from './create-semister.dto';

export class UpdateSemisterDto extends PartialType(CreateSemisterDto) {}
