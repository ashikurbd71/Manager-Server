import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateManagerDto {

    
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  position: string;

   @IsNotEmpty()
   @IsString()
   email: string;

   @IsNotEmpty()
   @IsDate()
   startDate: Date;

   @IsNotEmpty()
   @IsDate()
   endDate: Date;
   
   @IsNotEmpty()
   profile: string; // Add this proper
}
