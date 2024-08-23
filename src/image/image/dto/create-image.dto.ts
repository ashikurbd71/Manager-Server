import { IsDate, IsNotEmpty, IsArray, IsString } from 'class-validator';

export class CreateImageDto {
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsArray()
  // @IsString({ each: true }) // Ensure each element in the array is a string
  profile: string[]; // Accept an array of file paths

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  title: string;
}
