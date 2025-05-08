import { ApiProperty } from '@nestjs/swagger';

export class CreateReadingDto {
  @ApiProperty({ required: false, description: 'Time allowed for the reading test (in minutes)', example: '60' })
  time?: string;

  @ApiProperty({ required: false, description: 'Level of difficulty', example: 'Intermediate' })
  level?: string;

  @ApiProperty({ required: false, description: 'Name of the reading test', example: 'IELTS Practice Test 1' })
  name?: string;

  @ApiProperty({ required: false, description: 'Band level', example: '6.5' })
  band?: string;

  @ApiProperty({ required: false, description: 'Time option', example: 'normal' })
  time_option?: string;

  @ApiProperty({ required: false, description: 'Description of the reading test' })
  description?: string;

  @ApiProperty({ required: false, description: 'Total number of questions', example: '40' })
  total_question?: string;

  @ApiProperty({ required: false, description: 'Total number of correct answers', example: '0' })
  total_correct?: string;
}
