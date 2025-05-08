import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ReadingService } from './reading.service';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/interfaces';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('reading')
@UseGuards(AuthGuard('jwt'))
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post('add')
  create(
    @Body() createReadingDto: CreateReadingDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.data.user_id;

    return this.readingService.create(createReadingDto, userId);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    const userId = req.user.data.user_id;

    return this.readingService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readingService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateReadingDto: UpdateReadingDto) {
    return this.readingService.update(+id, updateReadingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readingService.remove(+id);
  }
}
