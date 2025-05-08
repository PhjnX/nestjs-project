import { ApiProperty } from '@nestjs/swagger';

export class UpdateReadingDto {
  @ApiProperty({ required: false, description: 'Time allowed for the reading test (in minutes)', example: '75' })
  time?: string;

  @ApiProperty({ required: false, description: 'Level of difficulty', example: 'Advanced' })
  level?: string;

  @ApiProperty({ required: false, description: 'Name of the reading test', example: 'IELTS Practice Test 2' })
  name?: string;

  @ApiProperty({ required: false, description: 'Band level', example: '7.0' })
  band?: string;

  @ApiProperty({ required: false, description: 'Time option', example: 'fast' })
  time_option?: string;

  @ApiProperty({ required: false, description: 'Description of the reading test' })
  description?: string;

  @ApiProperty({ required: false, description: 'Total number of questions', example: '50' })
  total_question?: string;

  @ApiProperty({ required: false, description: 'Total number of correct answers', example: '35' })
  total_correct?: string;
}
