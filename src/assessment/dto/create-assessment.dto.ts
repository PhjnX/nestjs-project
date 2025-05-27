import { ApiProperty } from '@nestjs/swagger';

export class CreateAssessmentDto {
  @ApiProperty({ example: 'IELTS Reading Test 1' })
  name: string;

  @ApiProperty({ example: 'B2' })
  level: string;

  @ApiProperty({ example: 60 })
  time: number;
}
