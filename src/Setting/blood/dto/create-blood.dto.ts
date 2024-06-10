import { IsNotEmpty, IsString } from "class-validator";



export class CreateBloodDto {

    @IsNotEmpty()
    @IsString()
    name: string;
  

   
  }
  