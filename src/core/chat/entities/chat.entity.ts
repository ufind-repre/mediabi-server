import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Chat extends Document<Types.ObjectId> {
  @Prop({ default: '' })
  public title: string;

  @Prop({ default: 0 })
  public messagesCount: number;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
