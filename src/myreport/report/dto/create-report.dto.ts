
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  totalTk: string;

  @IsNotEmpty()
  @IsString()
  totalMeal: string;

  @IsNotEmpty()
  @IsString()
  extraTk: string;

   @IsNotEmpty()
   @IsString()
   comments: string;

   @IsNotEmpty()
   list: string; // Add this property to store the image paththis proper

   @IsNotEmpty()
   reportStatus: string; 


}
