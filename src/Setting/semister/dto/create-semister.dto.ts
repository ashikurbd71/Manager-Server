
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSemisterDto {


  @IsNotEmpty()
  @IsString()
  name: string;
 
  @IsNotEmpty()
  @IsString()
  shortName: string;
 

}