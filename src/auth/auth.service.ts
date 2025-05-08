import { HttpException, HttpStatus, Injectable, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, user } from '@prisma/client';
import { bodyLogin } from './dto/login.dto';
import { BodySignup } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  constructor(private jwtService: JwtService) {}

  async login(bodyLogin: bodyLogin) {
    const { identifier, password } = bodyLogin;

    const getUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { user_name: identifier }],
      },
    });

    if (!getUser) {
      throw new HttpException(
        'Sai tài khoản hoặc mật khẩu!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!getUser.active) {
      throw new HttpException('Tài khoản đã bị khóa', HttpStatus.FORBIDDEN);
    }

    const isPasswordMatching = await (
      bcrypt.compare as (s: string, h: string) => Promise<boolean>
    )(password, getUser.password);

    if (!isPasswordMatching) {
      throw new HttpException('Sai mật khẩu!', HttpStatus.BAD_REQUEST);
    }

    const token = await this.jwtService.signAsync(
      { data: { user_id: getUser.user_id, role: getUser.role } },
      { expiresIn: '10d', secret: 'KHONG_CO_KHOA' },
    );

    return {
      token,
      role: getUser.role,
      email: getUser.email,
      user_name: getUser.user_name,
    };
  }

  async getMyInfo(requestingUserID: number): Promise<user> {
    const user = await this.prisma.user.findUnique({
      where: { user_id: requestingUserID },
    });

    if (!user) {
      throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async signup(@Body() bodySignup: BodySignup) {
    const checkEmail = await this.prisma.user.findUnique({
      where: { email: bodySignup.email },
    });
    if (checkEmail) {
      throw new HttpException('Email đã tồn tại!', HttpStatus.BAD_REQUEST);
    }

    const checkUsername = await this.prisma.user.findUnique({
      where: { user_name: bodySignup.user_name },
    });
    if (checkUsername) {
      throw new HttpException(
        'Tên tài khoản đã tồn tại!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!bodySignup.user_name?.trim()) {
      throw new HttpException('Thiếu tên tài khoản!', HttpStatus.BAD_REQUEST);
    }

    if (bodySignup.phone_number?.trim()) {
      const checkPhone = await this.prisma.user.findFirst({
        where: { phone_number: bodySignup.phone_number.trim() },
      });
      if (checkPhone) {
        throw new HttpException(
          'Số điện thoại đã tồn tại!',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const hashedPassword: string = await (
      bcrypt.hash as (s: string, r: number) => Promise<string>
    )(bodySignup.password, 10);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          user_name: bodySignup.user_name,
          email: bodySignup.email,
          password: hashedPassword,
          full_name: bodySignup.full_name?.trim() || null,
          phone_number: bodySignup.phone_number?.trim() || null,
          level:
            !bodySignup.level || bodySignup.level === 'string'
              ? null
              : bodySignup.level,
          band:
            !bodySignup.band || bodySignup.band === 'string'
              ? null
              : bodySignup.band,
          role: bodySignup.role ?? 'user',
        },
      });

      return newUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          let target = 'Trường dữ liệu';
          if (Array.isArray(error.meta?.target)) {
            target = error.meta.target.join(', ');
          }
          throw new HttpException(
            `${target} đã tồn tại!`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      throw new HttpException(
        'Lỗi khi tạo người dùng!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
