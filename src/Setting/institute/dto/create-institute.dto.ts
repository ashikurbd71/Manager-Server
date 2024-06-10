


import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInstituteDto {


  @IsNotEmpty()
  @IsString()
  name: string;
 
  @IsNotEmpty()
  @IsString()
  shortName: string;
 

}