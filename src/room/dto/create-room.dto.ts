

import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDateString, IsDate } from 'class-validator';



export class CreateRoomDto {


    @IsString()
    @IsOptional()
    roomNumber: string;

    @IsString()
    @IsOptional()
    floor: string;


    @IsNumber()
    count: number;


    @IsString()
    @IsNotEmpty()
    price: string;




    @IsNumber()
    @IsNotEmpty()
    seat: number;
   






}
