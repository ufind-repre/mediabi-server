import { InjectModel } from '@nestjs/mongoose';
import { CreateChatDto } from '../dto/create-chat.dto';
import { Chat } from '../entities/chat.entity';
import { IChatRepository } from './chat.repository';
import { Model } from 'mongoose';
import { UpdateChatDto } from '../dto/update-chat.dto';

export class MongoChatRepository implements IChatRepository {
  public constructor(
    @InjectModel('Chat') private readonly chatModel: Model<Chat>,
  ) {}

  public create(createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatModel.insertOne(createChatDto);
  }

  public findById(id: string): Promise<Chat | null> {
    return this.chatModel.findById(id).exec();
  }

  public async addMessage(id: string): Promise<void> {
    await this.chatModel
      .findByIdAndUpdate(id, {
        $inc: { messagesCount: 1 },
      })
      .exec();
  }

  public async update(id: string, updateChatDto: UpdateChatDto): Promise<void> {
    await this.chatModel.findByIdAndUpdate(id, updateChatDto).exec();
  }
}
