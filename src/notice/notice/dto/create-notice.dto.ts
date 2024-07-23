import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateNoticeDto {

    @IsNotEmpty()
    @IsString()
    assigner: string;
  
    @IsNotEmpty()
    @IsString()
    position: string;
  
    @IsNotEmpty()
    @IsDate()
    date: Date;
  
    @IsNotEmpty()
    @IsString()
    noticetitle: string;
  
     @IsNotEmpty()
     @IsString()
     discription: string;
     

  
}
