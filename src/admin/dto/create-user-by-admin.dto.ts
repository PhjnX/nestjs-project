// src/admin/dto/create-user-by-admin.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { user_role } from '@prisma/client';

export class CreateUserByAdminDto {
  @ApiProperty()
  @IsString()
  user_name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: user_role })
  @IsEnum(user_role)
  role: user_role;
}
