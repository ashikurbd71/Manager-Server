import { PartialType } from '@nestjs/mapped-types';
import { CreateMealmanageDto } from './create-mealmanage.dto';

export class UpdateMealmanageDto extends PartialType(CreateMealmanageDto) {}
