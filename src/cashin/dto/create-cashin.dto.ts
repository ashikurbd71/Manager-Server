import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDateString, IsDate } from 'class-validator';



export class CreateCashinDto {

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  code: string;


  @IsString()
  name: string;


}
