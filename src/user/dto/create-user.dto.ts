// create-user.dto.ts
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean, // ✅ thêm dòng này
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { user_role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'newuser01' })
  @IsString()
  user_name: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Nguyen Van A', required: false })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiProperty({ example: 'newuser01@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '0123456789', required: false })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MaxLength(10)
  level?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MaxLength(10)
  band?: string;

  @ApiProperty({ enum: user_role, example: 'user', required: false })
  @IsOptional()
  @IsEnum(user_role)
  role?: user_role;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean; // ✅ thêm dòng này
}
