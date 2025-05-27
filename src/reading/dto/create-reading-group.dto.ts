import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateReadingGroupDto {
  @IsNotEmpty()
  @IsString()
  heading: string;

  @IsNotEmpty()
  @IsString()
  question_type: string;

  @IsNotEmpty()
  @IsNumber()
  start_number: number;

  @IsNotEmpty()
  @IsNumber()
  end_number: number;
}
