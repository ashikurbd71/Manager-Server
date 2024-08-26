import { IsDate, IsNotEmpty, IsArray, IsString } from 'class-validator';

export class CreateImageDto {
  @IsDate()
  date: Date;

  @IsNotEmpty()
  profile:  string ;// Accept an array of file paths

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  title: string;
}
