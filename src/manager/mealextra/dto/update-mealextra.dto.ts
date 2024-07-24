import { PartialType } from '@nestjs/mapped-types';
import { CreateMealextraDto } from './create-mealextra.dto';

export class UpdateMealextraDto extends PartialType(CreateMealextraDto) {}
