/*
https://docs.nestjs.com/websockets/gateways#gateways
*/

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { BlockService } from './block/block.service';
import { getBlockNumber } from './getBlockNumber';

@WebSocketGateway()
export class BlockTrackerGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private readonly blockService: BlockService) {}

  @WebSocketServer()
  server: any;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string) {
    console.log('Data:', data);
  }

  async handleConnection(client: any, ...args: any[]) {
    console.log('User connected');
    this.server.emit('block_event', 'User connected');
    while (true) {
      const current_block = await this.blockService.getCurrentBlock();
      const last_block = await getBlockNumber();
      if (last_block > current_block) {
        console.log('New block:', last_block);
        console.log('Old block:', current_block);
        this.server.emit('block_event', {
          current_block,
          last_block,
        });
        await this.blockService.updateBlock(last_block);
      }
      // await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  handleDisconnect(client: any) {
    console.log('User disconnected');
  } 

  afterInit(server: any) {
    console.log('Socket is live');
  }
}
