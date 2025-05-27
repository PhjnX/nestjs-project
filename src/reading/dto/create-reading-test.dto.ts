import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateReadingTestDto {
  @IsNumber()
  level: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  order_num?: number;

  @IsOptional()
  @IsNumber()
  time?: number;
}
