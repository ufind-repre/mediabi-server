import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMessageDto {
  @IsNotEmpty({ message: 'Digite uma mensagem válida' })
  public content: string;

  @IsMongoId({ message: 'Conversa inválida' })
  public chat: Types.ObjectId;

  public isAi?: boolean;
}
