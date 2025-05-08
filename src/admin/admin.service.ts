// src/admin/admin.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserByAdminDto) {
    const { email, user_name, password, role } = dto;

    const existed = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { user_name }] },
    });

    if (existed) {
      throw new BadRequestException('Email hoặc username đã tồn tại');
    }

    const hashed = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        user_name,
        password: hashed,
        role,
      },
    });
  }
}
