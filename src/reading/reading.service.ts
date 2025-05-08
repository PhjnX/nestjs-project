import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';

@Injectable()
export class ReadingService {
  prisma = new PrismaClient();

  async create(createReadingDto: CreateReadingDto, userId: number) {
    return this.prisma.reading_test.create({
      data: {
        ...createReadingDto,
      },
    });
  }

  async findAllByUser(userId: number) {
    const isAdmin = await this.prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    console.log(isAdmin);

    return this.prisma.reading_test.findMany({
      include: {
        reading_items: {
          include: {
            reading_question: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const reading = await this.prisma.reading_test.findUnique({
      where: { reading_test_id: id },
      include: {
        reading_items: {
          include: {
            reading_question: true,
          },
        },
      },
    });

    if (!reading)
      throw new HttpException('Không tìm thấy Reading', HttpStatus.NOT_FOUND);
    return reading;
  }

  async update(id: number, updateReadingDto: UpdateReadingDto) {
    const reading = await this.findOne(id);
    if (!reading)
      throw new HttpException('Không tìm thấy Reading', HttpStatus.NOT_FOUND);

    return this.prisma.reading_test.update({
      where: { reading_test_id: id },
      data: updateReadingDto,
    });
  }

  async remove(id: number) {
    const reading = await this.findOne(id);
    if (!reading)
      throw new HttpException('Không tìm thấy Reading', HttpStatus.NOT_FOUND);

    return this.prisma.reading_test.delete({
      where: { reading_test_id: id },
    });
  }
}
