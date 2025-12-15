import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { IChatRepository } from './repositories/chat.repository';
import { Chat } from './entities/chat.entity';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  public constructor(private readonly chatRepository: IChatRepository) {}

  public create(createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatRepository.create(createChatDto);
  }

  public async findById(id: string): Promise<Chat> {
    const chat = await this.chatRepository.findById(id);
    if (!chat) throw new NotFoundException('Conversa não encontrada');
    return chat;
  }

  public update(id: string, updateChatDto: UpdateChatDto): Promise<void> {
    return this.chatRepository.update(id, updateChatDto);
  }

  public addMessage(id: string): Promise<void> {
    return this.chatRepository.addMessage(id);
  }

  public async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.chatRepository.delete(id);
  }
}
