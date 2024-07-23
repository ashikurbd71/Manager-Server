
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateMealmanageDto {

    
  @IsNotEmpty()
  @IsString()
  addMoney: string;

  @IsNotEmpty()
  @IsString()
  totalMeal: string;

  @IsDate()
  date: Date;


}
