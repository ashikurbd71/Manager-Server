
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  totalTk: string;

  @IsNotEmpty()
  @IsString()
  totalMeal: string;

  @IsString()
  extraTk: string;

   @IsString()
   comments: string;

   @IsString()
   @IsOptional()
   feedBack: string;

   @IsString()
   reportStatus: string; 
   


   @IsDate()
   date: Date; 

   @IsNotEmpty()
   profile: string; 


}
