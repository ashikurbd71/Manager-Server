import { IsString } from "class-validator";

export class CreateUserDto {


  // static password(password: any, arg1: number) {
  //   throw new Error('Method not implemented.');
  // }



     @IsString()
     email : string
 
     @IsString()
     role : string

     @IsString()
     password : string;
  static password: any;

  

}



