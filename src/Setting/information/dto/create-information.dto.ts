import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateInformationDto {


    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    
    @IsNotEmpty()
    @IsString()
    phone: string;



    @IsInt()
    @IsNotEmpty()
    mealCharge: number;




}
