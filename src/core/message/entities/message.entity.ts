import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  public content: string;

  @Prop({
    required: true,
    index: true,
    type: Types.ObjectId,
    ref: 'Chat',
  })
  public chat: string;

  @Prop({ required: false })
  public isAi?: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
