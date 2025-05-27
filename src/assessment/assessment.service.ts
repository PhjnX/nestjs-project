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
        titleDescription: dto.titleDescription,
        headerContent: dto.headerContent,
        content: dto.content,
      },
    });
  }

  async updatePart(id: number, dto: CreatePartDto) {
    return this.prisma.assessmentPart.update({
      where: { id },
      data: {
        title: dto.title,
        instructions: dto.instructions,
        order: Number(dto.order),
        titleDescription: dto.titleDescription,
        headerContent: dto.headerContent,
        content: dto.content,
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
        groupId,
        options: dto.options
          ? typeof dto.options === 'string'
            ? dto.options
            : JSON.stringify(dto.options)
          : undefined,
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

  async updateAssessment(id: number, dto: CreateAssessmentDto) {
    return this.prisma.assessment_test.update({
      where: { id },
      data: {
        ...dto,
        time: Number(dto.time),
      },
    });
  }

  async updateGroup(id: number, dto: CreateGroupDto) {
    return this.prisma.questionGroup.update({
      where: { id },
      data: {
        ...dto,
        startNumber: Number(dto.startNumber),
        endNumber: Number(dto.endNumber),
      },
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

  async deleteAssessment(id: number) {
    return this.prisma.assessment_test.delete({ where: { id } });
  }

  async deletePart(id: number) {
    return this.prisma.assessmentPart.delete({ where: { id } });
  }

  async deleteGroup(id: number) {
    return this.prisma.questionGroup.delete({ where: { id } });
  }

  async deleteQuestion(id: number) {
    return this.prisma.assessmentQuestion.delete({ where: { id } });
  }

  async submitAssessment(
    userId: number,
    answers: { questionId: number; answer: string }[],
  ) {
    const questions = await this.prisma.assessmentQuestion.findMany({
      where: {
        id: { in: answers.map((a) => a.questionId) },
      },
      select: {
        id: true,
        correctAnswer: true,
        type: true, // Thêm trường type để xác định loại câu hỏi
        group: {
          select: {
            part: {
              select: {
                assessmentId: true,
              },
            },
          },
        },
      },
    });

    if (questions.length === 0) {
      throw new BadRequestException('Không tìm thấy câu hỏi');
    }

    const assessmentId = questions[0].group.part.assessmentId;
    let correctCount = 0;

    for (const q of questions) {
      const userAnswer = answers.find((a) => a.questionId === q.id)?.answer;
      const ua = (userAnswer ?? '').trim().toLowerCase();
      const ca = (q.correctAnswer ?? '').trim().toLowerCase();

      if (!ua) continue;

      if (q.type === 'input') {
        // Hỗ trợ nhiều đáp án đúng, phân cách bằng dấu |
        const correctList = ca.split('|').map((x) => x.trim());
        if (correctList.includes(ua)) correctCount++;
      } else {
        // Các loại khác vẫn so sánh bình thường
        if (ua === ca) correctCount++;
      }
    }

    const bandScore = this.mapScoreToBand(correctCount);

    await this.prisma.assessment_result.create({
      data: {
        userId,
        assessmentId,
        correctCount,
        totalQuestions: questions.length,
        bandScore,
      },
    });

    return {
      correctCount,
      totalQuestions: questions.length,
      bandScore,
    };
  }

  private mapScoreToBand(score: number): string {
    if (score >= 39) return '9.0';
    if (score >= 37) return '8.5';
    if (score >= 35) return '8.0';
    if (score >= 33) return '7.5';
    if (score >= 30) return '7.0';
    if (score >= 27) return '6.5';
    if (score >= 23) return '6.0';
    if (score >= 19) return '5.5';
    if (score >= 15) return '5.0';
    if (score >= 12) return '4.5';
    return '4.0';
  }
}
