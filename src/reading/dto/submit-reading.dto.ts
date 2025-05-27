import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserReadingAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  question_id: number;

  @IsNotEmpty()
  @IsString()
  user_answer: string;
}

export class SubmitReadingDto {
  @IsNotEmpty()
  @IsNumber()
  reading_test_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserReadingAnswerDto)
  answers: UserReadingAnswerDto[];
}
