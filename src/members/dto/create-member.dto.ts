

import { IsNotEmpty, IsString, IsEmail, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class CreateMemberDto {


  @IsNotEmpty()
  @IsString()
  name: string;

  
  @IsNotEmpty()
  @IsString()
  fatherName: string;

  @IsNotEmpty()
  @IsString()
  fatherNumber: string;
  
  @IsNotEmpty()
  @IsString()
  motherName: string;
  
  @IsNotEmpty()
  @IsString()
  motherNumber: string;


  @IsString()
  brithCertifecate: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  code: string;


  @IsString()
  instituteNameId: string;

  @IsNotEmpty()
  @IsString()
  session: string;

  // @IsNotEmpty()
  // @IsString()
  //  department: string;


   @IsNotEmpty()
   @IsString()
   nid: string;

   
  //  @IsOptional()
  //  @IsString()
  //  bloodGroup: string;

   @IsNotEmpty()
   @IsString()
   address: string;

  //  @IsNotEmpty()
  //  @IsString()
  //  semister: string;

   @IsNotEmpty()
   @IsString()
   email: string;

   @IsNotEmpty()
   @IsDate()
   joiningDate: Date;

   
   @IsNotEmpty()
   profile: string; // Add this property to store the image path

}