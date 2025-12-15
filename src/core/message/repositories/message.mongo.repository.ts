import { InjectModel } from '@nestjs/mongoose';
import { CreateMessageDto } from '../dto/create-message.dto';
import { FindMessageDto } from '../dto/find-message.dto';
import { Message } from '../entities/message.entity';
import { IMessageRepository } from './message.repository';
import { Model, PipelineStage } from 'mongoose';

export class MongoMessageRepository implements IMessageRepository {
  public constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
  ) {}

  public create(createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageModel.insertOne(createMessageDto);
  }

  public findManyByChat(
    chat: string,
    findMessageDto: FindMessageDto,
  ): Promise<Message[]> {
    const pipeline: PipelineStage[] = [
      { $match: { chat } },
      { $sort: { createdAt: -1 } },
    ];

    if (findMessageDto.orderBy) {
      const [field, direction] = findMessageDto.orderBy.split(':');
      if (field && direction)
        pipeline.push({ $sort: { [field]: direction == 'desc' ? -1 : 1 } });
    }

    if (findMessageDto.limit && findMessageDto.limit > 0) {
      if (findMessageDto.page && findMessageDto.page >= 0)
        pipeline.push({ $skip: findMessageDto.page * findMessageDto.limit });
      pipeline.push({ $limit: findMessageDto.limit });
    }

    return this.messageModel.aggregate<Message>(pipeline).exec();
  }

  public findLasts(findMessageDto: FindMessageDto): Promise<Message[]> {
    const pipeline: PipelineStage[] = [
      {
        $group: {
          _id: '$chat',
          doc: { $first: '$$ROOT' },
        },
      },
      { $replaceRoot: { newRoot: '$doc' } },
      {
        $lookup: {
          from: 'chats',
          localField: 'chat',
          foreignField: '_id',
          as: 'chat',
        },
      },
      { $unwind: '$chat' },
      {
        $set: {
          content: { $substrCP: ['$content', 0, 50] },
        },
      },
      {
        $project: {
          _id: 0,
          isAi: 0,
        },
      },
      { $sort: { 'chat.updatedAt': -1 } },
    ];

    if (findMessageDto.limit && findMessageDto.limit > 0) {
      if (findMessageDto.page !== undefined && findMessageDto.page >= 0)
        pipeline.push({ $skip: findMessageDto.page * findMessageDto.limit });
      pipeline.push({ $limit: findMessageDto.limit });
    }

    return this.messageModel.aggregate<Message>(pipeline).exec();
  }
}
