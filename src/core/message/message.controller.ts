import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { FindMessageDto } from './dto/find-message.dto';

@Controller('message')
export class MessageController {
  public constructor(private readonly messageService: MessageService) {}

  @Post()
  public create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageService.create(createMessageDto);
  }

  @Get('lasts')
  public findLasts(
    @Query() findMessageDto: FindMessageDto,
  ): Promise<Message[]> {
    return this.messageService.findLasts(findMessageDto);
  }

  @Get(':chat')
  public findManyByChat(
    @Param('chat', ParseObjectIdPipe) chat: string,
    @Query() findMessageDto: FindMessageDto,
  ): Promise<Message[]> {
    return this.messageService.findManyByChat(chat, findMessageDto);
  }
}
