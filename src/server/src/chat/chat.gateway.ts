import { Logger } from '@nestjs/common';
import {
  ConnectedSocket, MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ChatDto } from './chat.dto';
import { User } from './user.interface';

enum Events {
  Connect = 'userConnect',
  Disconnect = 'userDisconnect',
  SendMessage = 'sendMessage',
  ReceiveMessage = 'receiveMessage',
  ChatUsers = 'chatUsers'
}

@WebSocketGateway({ cors: true })
export class ChatGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChatGateway.name);
  private users: User[] = [];

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    const { sockets } = this.io.sockets;
    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket)  {
    this.logger.log(`Client id:${client.id} disconnected`);
    this.users = this.users.filter((user) => user.socketId != client.id);
    this.sendChatUsers();
  }

  @SubscribeMessage(Events.SendMessage)
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: ChatDto) {
    const date = Date.now();
    this.logger.log(`Message received from client id: ${client.id}, name: ${data.username}`);
    this.logger.debug(`Payload: ${data}`);
    this.io.emit(Events.ReceiveMessage, {
      username: data.username,
      message: data.message,
      date
    });
  }

  @SubscribeMessage(Events.Connect)
  handleUserConnect(@ConnectedSocket() client: Socket, @MessageBody() data: ChatDto) {
    this.logger.log(`User connected with client id: ${client.id}, name: ${data.username}`);
    this.logger.debug(`Payload: ${data.username}, ${data.date}`);
    this.users.push({
      socketId: client.id,
      username: data.username,
    });
    this.sendMessage(`${data.username} has joined the chat room`);
    this.sendChatUsers();
  }

  @SubscribeMessage(Events.Disconnect)
  handleUserDisconnect(@ConnectedSocket() client: Socket, @MessageBody() data: ChatDto) {
    this.logger.log(`User disconnected with client id: ${client.id}, name: ${data}`);
    this.logger.debug(`Payload: ${data}`);
    this.sendMessage(`${data.username} has left the chat room`);
  }
  sendMessage(message: string) {
    const date = Date.now();
    this.io.emit(Events.ReceiveMessage, {
      username: 'Server',
      message,
      date
    });
  }

  sendChatUsers() {
    const date = Date.now();
    this.io.emit(Events.ChatUsers, {
      chatUsers: this.users,
      date
    });
  }
}
