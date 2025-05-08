import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { CreatePartDto } from './dto/create-part.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class AssessmentService {
  private prisma = new PrismaClient();

  async createAssessment(dto: CreateAssessmentDto) {
    if (!dto.name || !dto.level || !dto.time) {
      throw new BadRequestException('Thiếu dữ liệu bắt buộc');
    }

    return this.prisma.assessment_test.create({
      data: {
        ...dto,
        time: Number(dto.time),
      },
    });
  }

  async createPart(assessmentId: number, dto: CreatePartDto) {
    if (!dto.title || dto.order === undefined) {
      throw new BadRequestException('Thiếu tiêu đề hoặc thứ tự');
    }

    return this.prisma.assessmentPart.create({
      data: {
        title: dto.title,
        instructions: dto.instructions,
        order: Number(dto.order),
        assessmentId: assessmentId,
      },
    });
  }

  async createGroup(partId: number, dto: CreateGroupDto) {
    if (!dto.heading || !dto.questionType) {
      throw new BadRequestException('Thiếu heading hoặc loại câu hỏi');
    }

    return this.prisma.questionGroup.create({
      data: {
        ...dto,
        partId,
        startNumber: Number(dto.startNumber),
        endNumber: Number(dto.endNumber),
      },
    });
  }

  async createQuestion(groupId: number, dto: CreateQuestionDto) {
    if (!dto.questionText || !dto.correctAnswer) {
      throw new BadRequestException('Thiếu nội dung hoặc đáp án');
    }

    return this.prisma.assessmentQuestion.create({
      data: {
        ...dto,
        options: dto.options
          ? typeof dto.options === 'string'
            ? dto.options
            : JSON.stringify(dto.options)
          : undefined,
        groupId,
      },
    });
  }

  async getAllAssessments() {
    return this.prisma.assessment_test.findMany({
      include: {
        parts: {
          include: {
            groups: {
              include: {
                questions: true,
              },
            },
          },
        },
      },
    });
  }
  // UPDATE
  async updateAssessment(id: number, dto: CreateAssessmentDto) {
    return this.prisma.assessment_test.update({
      where: { id },
      data: {
        ...dto,
        time: Number(dto.time),
      },
    });
  }

  async updatePart(id: number, dto: CreatePartDto) {
    return this.prisma.assessmentPart.update({
      where: { id },
      data: {
        ...dto,
        order: Number(dto.order),
      },
    });
  }

  async updateGroup(id: number, dto: CreateGroupDto) {
    return this.prisma.questionGroup.update({
      where: { id },
      data: dto,
    });
  }

  async updateQuestion(id: number, dto: CreateQuestionDto) {
    return this.prisma.assessmentQuestion.update({
      where: { id },
      data: {
        ...dto,
        options: dto.options
          ? Array.isArray(dto.options)
            ? JSON.stringify(dto.options)
            : dto.options
          : undefined,
      },
    });
  }

  // DELETE
  async deleteAssessment(id: number) {
    return this.prisma.assessment_test.delete({
      where: { id },
    });
  }

  async deletePart(id: number) {
    return this.prisma.assessmentPart.delete({
      where: { id },
    });
  }

  async deleteGroup(id: number) {
    return this.prisma.questionGroup.delete({
      where: { id },
    });
  }

  async deleteQuestion(id: number) {
    return this.prisma.assessmentQuestion.delete({
      where: { id },
    });
  }
}
