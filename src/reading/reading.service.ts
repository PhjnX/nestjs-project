import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateReadingTestDto } from './dto/create-reading-test.dto';
import { UpdateReadingTestDto } from './dto/update-reading.dto';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { CreateReadingGroupDto } from './dto/create-reading-group.dto';
import { CreateReadingQuestionDto } from './dto/create-reading-question.dto';
import { SubmitReadingDto } from './dto/submit-reading.dto';

@Injectable()
export class ReadingService {
  private prisma = new PrismaClient();

  // --------- READING TEST ---------
  async getAllTests() {
    return this.prisma.reading_test.findMany({
      include: {
        reading_part: {
          include: {
            reading_group: {
              include: {
                reading_question: true,
              },
            },
          },
        },
      },
      orderBy: [{ order_num: 'asc' }],
    });
  }

  async createTest(dto: CreateReadingTestDto) {
    return this.prisma.reading_test.create({
      data: {
        level: dto.level !== undefined ? Number(dto.level) : null,
        title: dto.title,
        order_num: dto.order_num !== undefined ? Number(dto.order_num) : null,
        description: dto.description,
        time: dto.time !== undefined ? Number(dto.time) : null,
      },
    });
  }

  async updateTest(id: number, dto: UpdateReadingTestDto) {
    return this.prisma.reading_test.update({
      where: { id },
      data: {
        level: dto.level !== undefined ? Number(dto.level) : undefined,
        title: dto.title,
        order_num:
          dto.order_num !== undefined ? Number(dto.order_num) : undefined,
        description: dto.description,
        time: dto.time !== undefined ? Number(dto.time) : undefined,
      },
    });
  }

  async deleteTest(id: number) {
    return this.prisma.reading_test.delete({ where: { id } });
  }

  // --------- READING PART ---------
  async createPart(readingTestId: number, dto: CreatePartDto) {
    return this.prisma.reading_part.create({
      data: {
        title: dto.title,
        instructions: dto.instructions,
        order_num: dto.order_num !== undefined ? Number(dto.order_num) : null,
        titleDescription: dto.titleDescription,
        headerContent: dto.headerContent,
        content: dto.content,
        reading_test_id: readingTestId,
      },
    });
  }

  async updatePart(id: number, dto: UpdatePartDto) {
    return this.prisma.reading_part.update({
      where: { id },
      data: {
        title: dto.title,
        instructions: dto.instructions,
        order_num: dto.order_num !== undefined ? Number(dto.order_num) : null,
        titleDescription: dto.titleDescription,
        headerContent: dto.headerContent,
        content: dto.content,
      },
    });
  }

  async deletePart(id: number) {
    return this.prisma.reading_part.delete({ where: { id } });
  }

  // --------- READING GROUP ---------
  async createGroup(partId: number, dto: CreateReadingGroupDto) {
    return this.prisma.reading_group.create({
      data: {
        heading: dto.heading,
        question_type: dto.question_type,
        start_number: dto.start_number,
        end_number: dto.end_number,
        reading_part_id: partId,
      },
    });
  }

  async updateGroup(id: number, dto: CreateReadingGroupDto) {
    return this.prisma.reading_group.update({
      where: { id },
      data: {
        heading: dto.heading,
        question_type: dto.question_type,
        start_number: dto.start_number,
        end_number: dto.end_number,
      },
    });
  }

  async deleteGroup(id: number) {
    return this.prisma.reading_group.delete({ where: { id } });
  }

  // --------- READING QUESTION ---------
  async createQuestion(groupId: number, dto: CreateReadingQuestionDto) {
    return this.prisma.reading_question.create({
      data: {
        question_text: dto.question_text,
        options: dto.options,
        correct_answer: dto.correct_answer,
        explanation: dto.explanation,
        type: dto.type,
        paragraph_heading: dto.paragraph_heading,
        line_reference: dto.line_reference,
        show_answer: dto.show_answer,
        order_num: dto.order_num ?? null,
        group_id: groupId,
      },
    });
  }

  async updateQuestion(id: number, dto: CreateReadingQuestionDto) {
    return this.prisma.reading_question.update({
      where: { id },
      data: {
        question_text: dto.question_text,
        options: dto.options,
        correct_answer: dto.correct_answer,
        explanation: dto.explanation,
        type: dto.type,
        paragraph_heading: dto.paragraph_heading,
        line_reference: dto.line_reference,
        show_answer: dto.show_answer,
        order_num: dto.order_num ?? null,
      },
    });
  }

  async deleteQuestion(id: number) {
    return this.prisma.reading_question.delete({ where: { id } });
  }

  // --------- SUBMIT READING ---------
  async submitReading(userId: number, dto: SubmitReadingDto) {
    const allParts = await this.prisma.reading_part.findMany({
      where: { reading_test_id: dto.reading_test_id },
      select: { id: true },
    });
    const allGroups = await this.prisma.reading_group.findMany({
      where: { reading_part_id: { in: allParts.map((p) => p.id) } },
      select: { id: true },
    });
    const allQuestions = await this.prisma.reading_question.findMany({
      where: {
        group_id: { in: allGroups.map((g) => g.id) },
      },
      select: { id: true, correct_answer: true },
    });

    let correctCount = 0;
    const details: {
      question_id: number;
      user_answer: string;
      is_correct: boolean;
    }[] = [];

    for (const answer of dto.answers) {
      const question = allQuestions.find((q) => q.id === answer.question_id);
      const isCorrect =
        question && question.correct_answer === answer.user_answer;
      if (isCorrect) correctCount++;
      details.push({
        question_id: answer.question_id,
        user_answer: answer.user_answer,
        is_correct: !!isCorrect,
      });
    }

    const result = await this.prisma.reading_result.create({
      data: {
        user_id: userId,
        reading_test_id: dto.reading_test_id,
        reading_result_detail: {
          create: details,
        },
      },
      include: {
        reading_result_detail: true,
      },
    });

    return {
      result_id: result.id,
      correct: correctCount,
      total: dto.answers.length,
      detail: result.reading_result_detail,
    };
  }
}
