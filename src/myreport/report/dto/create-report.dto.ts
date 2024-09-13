
import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateReportDto {

  @IsNotEmpty()
  @IsObject()
  sender: object;


  @IsNotEmpty()
  @IsString()
  totalTk: string;

  @IsNotEmpty()
  @IsString()
  totalMeal: string;

  @IsOptional()
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
