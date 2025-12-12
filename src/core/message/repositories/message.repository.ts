import { CreateMessageDto } from '../dto/create-message.dto';
import { FindMessageDto } from '../dto/find-message.dto';
import { Message } from '../entities/message.entity';

export abstract class IMessageRepository {
  public abstract create(createMessageDto: CreateMessageDto): Promise<Message>;
  public abstract findManyByChat(
    chat: string,
    findMessageDto: FindMessageDto,
  ): Promise<Message[]>;
  public abstract findLasts(findMessageDto: FindMessageDto): Promise<Message[]>;
}
