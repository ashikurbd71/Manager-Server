import { PartialType } from '@nestjs/mapped-types';
import { CreateCashoutDto } from './create-cashout.dto';

export class UpdateCashoutDto extends PartialType(CreateCashoutDto) {}
