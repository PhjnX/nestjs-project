import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { CreatePartDto } from './dto/create-part.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post()
  createAssessment(@Body() dto: CreateAssessmentDto) {
    return this.assessmentService.createAssessment(dto);
  }

  @Post(':id/parts')
  createPart(@Param('id') id: string, @Body() dto: CreatePartDto) {
    return this.assessmentService.createPart(+id, dto);
  }

  @Post('parts/:partId/groups')
  createGroup(@Param('partId') partId: string, @Body() dto: CreateGroupDto) {
    return this.assessmentService.createGroup(+partId, dto);
  }

  @Post('groups/:groupId/questions')
  createQuestion(
    @Param('groupId') groupId: string,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.assessmentService.createQuestion(+groupId, dto);
  }

  @Get()
  getAllAssessments() {
    return this.assessmentService.getAllAssessments();
  }

  @Put(':id')
  updateAssessment(@Param('id') id: string, @Body() dto: CreateAssessmentDto) {
    return this.assessmentService.updateAssessment(+id, dto);
  }

  @Put('parts/:id')
  updatePart(@Param('id') id: string, @Body() dto: CreatePartDto) {
    return this.assessmentService.updatePart(+id, dto);
  }

  @Put('groups/:id')
  updateGroup(@Param('id') id: string, @Body() dto: CreateGroupDto) {
    return this.assessmentService.updateGroup(+id, dto);
  }

  @Put('questions/:id')
  updateQuestion(@Param('id') id: string, @Body() dto: CreateQuestionDto) {
    return this.assessmentService.updateQuestion(+id, dto);
  }

  @Delete(':id')
  deleteAssessment(@Param('id') id: string) {
    return this.assessmentService.deleteAssessment(+id);
  }

  @Delete('parts/:id')
  deletePart(@Param('id') id: string) {
    return this.assessmentService.deletePart(+id);
  }

  @Delete('groups/:id')
  deleteGroup(@Param('id') id: string) {
    return this.assessmentService.deleteGroup(+id);
  }

  @Delete('questions/:id')
  deleteQuestion(@Param('id') id: string) {
    return this.assessmentService.deleteQuestion(+id);
  }

  @Post('submit')
  submitAssessment(
    @Body()
    body: {
      userId: number;
      answers: { questionId: number; answer: string }[];
    },
  ) {
    return this.assessmentService.submitAssessment(body.userId, body.answers);
  }
}
