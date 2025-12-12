import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './entities/chat.entity';
import { IChatRepository } from './repositories/chat.repository';
import { MongoChatRepository } from './repositories/chat.mongo.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }])],
  controllers: [ChatController],
  providers: [
    ChatService,
    { provide: IChatRepository, useClass: MongoChatRepository },
  ],
  exports: [ChatService],
})
export class ChatModule {}
