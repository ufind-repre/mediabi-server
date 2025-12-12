import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Message extends Document<Types.ObjectId> {
  @Prop({ required: true })
  public content: string;

  @Prop({ required: true, index: true })
  public chat: Types.ObjectId;

  @Prop({ required: false })
  public isAi?: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
