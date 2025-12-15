import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('chat')
export class ChatController {
  public constructor(private readonly chatService: ChatService) {}

  @Post()
  public create(@Body() createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatService.create(createChatDto);
  }

  @Get(':id')
  public findById(@Param('id', ParseObjectIdPipe) id: string): Promise<Chat> {
    return this.chatService.findById(id);
  }

  @Delete(':id')
  public delete(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    return this.chatService.delete(id);
  }
}
