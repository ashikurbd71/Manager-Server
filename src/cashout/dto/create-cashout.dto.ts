
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDateString, IsDate } from 'class-validator';



export class CreateCashoutDto {


    @IsString()
    @IsNotEmpty()
    name: string;




    @IsString()
    @IsNotEmpty()
    code: string;


    @IsString()
    @IsNotEmpty()
    comment: string;
   

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDate()
  @IsNotEmpty()
  date: Date;





}
