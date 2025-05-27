import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ReadingService } from './reading.service';
import { CreateReadingTestDto } from './dto/create-reading-test.dto';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { CreateReadingGroupDto } from './dto/create-reading-group.dto';
import { CreateReadingQuestionDto } from './dto/create-reading-question.dto';
import { SubmitReadingDto } from './dto/submit-reading.dto';
import { UpdateReadingTestDto } from './dto/update-reading.dto';

@Controller('reading')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  // --------- READING TEST ---------
  @Get()
  async getAllTests() {
    return this.readingService.getAllTests();
  }

  @Post()
  async createTest(@Body() dto: CreateReadingTestDto) {
    return this.readingService.createTest(dto);
  }

  @Put(':id')
  async updateTest(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReadingTestDto,
  ) {
    return this.readingService.updateTest(id, dto);
  }

  @Delete(':id')
  async deleteTest(@Param('id', ParseIntPipe) id: number) {
    return this.readingService.deleteTest(id);
  }

  // --------- READING PART ---------
  @Post(':readingTestId/parts')
  async createPart(
    @Param('readingTestId', ParseIntPipe) readingTestId: number,
    @Body() dto: CreatePartDto,
  ) {
    return this.readingService.createPart(readingTestId, dto);
  }

  @Put('/parts/:id')
  async updatePart(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePartDto,
  ) {
    return this.readingService.updatePart(id, dto);
  }

  @Delete('/parts/:id')
  async deletePart(@Param('id', ParseIntPipe) id: number) {
    return this.readingService.deletePart(id);
  }

  // --------- READING GROUP ---------
  @Post('/parts/:partId/groups')
  async createGroup(
    @Param('partId', ParseIntPipe) partId: number,
    @Body() dto: CreateReadingGroupDto,
  ) {
    return this.readingService.createGroup(partId, dto);
  }

  @Put('/groups/:id')
  async updateGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateReadingGroupDto,
  ) {
    return this.readingService.updateGroup(id, dto);
  }

  @Delete('/groups/:id')
  async deleteGroup(@Param('id', ParseIntPipe) id: number) {
    return this.readingService.deleteGroup(id);
  }

  // --------- READING QUESTION ---------
  @Post('/groups/:groupId/questions')
  async createQuestion(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() dto: CreateReadingQuestionDto,
  ) {
    return this.readingService.createQuestion(groupId, dto);
  }

  @Put('/questions/:id')
  async updateQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateReadingQuestionDto,
  ) {
    return this.readingService.updateQuestion(id, dto);
  }

  @Delete('/questions/:id')
  async deleteQuestion(@Param('id', ParseIntPipe) id: number) {
    return this.readingService.deleteQuestion(id);
  }

  // --------- SUBMIT ---------
  @Post('/submit')
  async submitReading(@Req() req, @Body() dto: SubmitReadingDto) {
    const userId = req.user?.user_id || 1;
    return this.readingService.submitReading(userId, dto);
  }
}
