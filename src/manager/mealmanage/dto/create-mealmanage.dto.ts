
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateMealmanageDto {

    
  @IsNotEmpty()
  @IsString()
  addMoney: string;

  @IsNotEmpty()
  @IsString()
  totalMeal: string;


  @IsString()
  blance: string;


  @IsString()
  eatMeal: string;


  @IsString()
  loan: string;

  @IsDate()
  date: Date;


}
