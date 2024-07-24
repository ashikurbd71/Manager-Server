import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateMealextraDto {


    @IsString()
    extraMoney: string;
    
    @IsDate()
    date: Date;

    @IsString()
    comments: string;
}
