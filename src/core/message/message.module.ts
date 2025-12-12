import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './entities/message.entity';
import { ChatModule } from '../chat/chat.module';
import { IMessageRepository } from './repositories/message.repository';
import { MongoMessageRepository } from './repositories/message.mongo.repository';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    ChatModule,
    AiModule,
  ],
  controllers: [MessageController],
  providers: [
    MessageService,
    { provide: IMessageRepository, useClass: MongoMessageRepository },
  ],
})
export class MessageModule {}
