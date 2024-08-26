import { PartialType } from '@nestjs/mapped-types';
import { CreateBazalistDto } from './create-bazalist.dto';

export class UpdateBazalistDto extends PartialType(CreateBazalistDto) {}
