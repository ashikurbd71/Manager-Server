

import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDateString, IsDate } from 'class-validator';



export class CreateRoomDto {


    @IsString()
    @IsNotEmpty()
    roomNumber: string;

    @IsString()
    @IsNotEmpty()
    floor: string;


    @IsNumber()
    count: number;


    @IsString()
    @IsNotEmpty()
    price: string;


    @IsString()
    @IsNotEmpty()
    code: string;


    @IsNumber()
    @IsNotEmpty()
    seat: number;
   






}
