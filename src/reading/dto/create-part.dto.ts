import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePartDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsString()
  titleDescription?: string;

  @IsOptional()
  @IsString()
  headerContent?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  order_num?: number;
}
