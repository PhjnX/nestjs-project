// src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class bodyLogin {
  @ApiProperty({
    example: 'student@gmail.com hoặc student123',
    description: 'Có thể là email hoặc user_name',
  })
  identifier: string;

  @ApiProperty({ example: '123456' })
  password: string;
}
