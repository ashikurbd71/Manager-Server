

import { IsNotEmpty, IsString, IsEmail, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class CreateMemberDto {


  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  instituteName: string;


  @IsNotEmpty()
  @IsString()
   department: string;


   @IsNotEmpty()
   @IsString()
   nid: string;

   
   @IsOptional()
   @IsString()
   bloodGroup: string;

   @IsNotEmpty()
   @IsString()
   address: string;

   @IsNotEmpty()
   @IsString()
   semister: string;

   @IsNotEmpty()
   @IsString()
   email: string;

   @IsNotEmpty()
   @IsDate()
   joiningDate: Date;




}