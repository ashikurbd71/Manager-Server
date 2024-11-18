import { PartialType } from '@nestjs/mapped-types';
import { CreateCashinDto } from './create-cashin.dto';

export class UpdateCashinDto extends PartialType(CreateCashinDto) {}
