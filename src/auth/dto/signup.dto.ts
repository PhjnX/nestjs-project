// signup.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IsOptional } from 'class-validator';

export class BodySignup extends CreateUserDto {
  @ApiProperty({
    description: 'Vai trò mặc định là user',
    required: false,
    example: 'user',
  })
  @IsOptional()
  role?: 'user'; // người dùng chỉ được đăng ký với role là 'user'
}
