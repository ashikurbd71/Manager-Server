import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  productSl: number;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  productDetails: string;

  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @IsNumber()
  @IsNotEmpty()
  sellAmount: number;

  @IsDate()
  date: Date;
}
