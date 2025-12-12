import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { IMessageRepository } from './repositories/message.repository';
import { ChatService } from '../chat/chat.service';
import { AiService } from '../ai/ai.service';
import { Message } from './entities/message.entity';
import { FindMessageDto } from './dto/find-message.dto';

@Injectable()
export class MessageService {
  public constructor(
    private readonly messageRepository: IMessageRepository,
    private readonly chatService: ChatService,
    private readonly aiService: AiService,
  ) {}

  public async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const chat = await this.chatService.findById(String(createMessageDto.chat));
    createMessageDto.chat = chat._id;

    await this.messageRepository.create(createMessageDto);

    if (!chat.title.length)
      await this.chatService.update(String(chat._id), {
        title: createMessageDto.content,
      });

    await this.chatService.addMessage(String(chat._id));

    const aiResponse = await this.aiService.answer(createMessageDto.content);

    await this.chatService.addMessage(String(chat._id));

    return this.messageRepository.create({
      content: aiResponse,
      chat: createMessageDto.chat,
      isAi: true,
    });
  }

  public findManyByChat(
    chat: string,
    findMessageDto: FindMessageDto,
  ): Promise<Message[]> {
    return this.messageRepository.findManyByChat(chat, findMessageDto);
  }

  public findLasts(findMessageDto: FindMessageDto): Promise<Message[]> {
    return this.messageRepository.findLasts(findMessageDto);
  }
}
