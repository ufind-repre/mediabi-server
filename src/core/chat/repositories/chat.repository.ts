import { CreateChatDto } from '../dto/create-chat.dto';
import { UpdateChatDto } from '../dto/update-chat.dto';
import { Chat } from '../entities/chat.entity';

export abstract class IChatRepository {
  public abstract create(createChatDto: CreateChatDto): Promise<Chat>;
  public abstract findById(id: string): Promise<Chat | null>;
  public abstract addMessage(id: string): Promise<void>;
  public abstract update(
    id: string,
    updateChatDto: UpdateChatDto,
  ): Promise<void>;
  public abstract delete(id: string): Promise<void>;
}
