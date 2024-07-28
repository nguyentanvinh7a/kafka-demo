import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka) {}

  async onModuleInit() {
    this.kafkaService.subscribeToResponseOf('topic_name');
    await this.kafkaService.connect();
  }

  async sendMessage(message: string) {
    return this.kafkaService.emit('topic_name', { message });
  }

  @MessagePattern('topic_name')
  async handleMessage(data: any) {
    console.log('Received message:', data);
  }
}
