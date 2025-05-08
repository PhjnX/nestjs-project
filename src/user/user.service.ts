import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, user } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { user_id: userId },
    });
  }

  async createUser(userData: CreateUserDto) {
    if (!userData.password) {
      throw new HttpException('Mật khẩu là bắt buộc', HttpStatus.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    try {
      return await this.prisma.user.create({
        data: {
          user_name: userData.user_name,
          email: userData.email,
          password: hashedPassword,
          full_name: userData.full_name?.trim() || null,
          phone_number: userData.phone_number?.trim() || null,
          role: userData.role ?? 'user',
          level: userData.level || null,
          band: userData.band || null,
          active: userData.active ?? true,
        },
      });
    } catch (error: any) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const rawTarget = error.meta?.target;
        const target = Array.isArray(rawTarget)
          ? rawTarget[0]
          : typeof rawTarget === 'string'
            ? rawTarget
            : undefined;

        const fieldMap: Record<string, string> = {
          user_user_name_key: 'Tên tài khoản',
          email: 'Email',
          phone_number: 'Số điện thoại',
        };

        const friendlyField = fieldMap[target ?? ''] || 'Trường dữ liệu';
        throw new HttpException(
          `${friendlyField} đã tồn tại!`,
          HttpStatus.BAD_REQUEST,
        );
      }

      console.error('❌ Lỗi tạo user:', error);
      throw new HttpException(
        'Lỗi khi tạo người dùng!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(userId: number, userData: Partial<user>) {
    const existingUser = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!existingUser) {
      throw new HttpException(
        'Không tìm thấy người dùng',
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedData: Partial<user> = {
      ...userData,
    };

    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(userData.password, salt);
    } else {
      updatedData.password = existingUser.password;
    }

    return this.prisma.user.update({
      where: { user_id: userId },
      data: updatedData,
    });
  }

  async deleteUser(userId: number) {
    return this.prisma.user.delete({
      where: { user_id: userId },
    });
  }
}
