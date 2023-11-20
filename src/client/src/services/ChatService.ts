import { connect, Socket } from 'socket.io-client';

export default class ChatService {
  connectionLink: string;

  private socket: Socket | null = null;

  username: string;

  isConnected = false;

  constructor(link: string, username = '') {
    this.connectionLink = link;
    this.username = username;
  }

  init(username: string) {
    this.setUsername(username);
    this.socket = connect(this.connectionLink);
    this.connect();
  }

  connect() {
    const date = Date.now();
    this.socket?.emit('userConnect', {
      username: this.username,
      date,
    });
    this.isConnected = true;
  }

  disconnect() {
    const date = Date.now();
    this.socket?.emit('userDisconnect', {
      username: this.username,
      date,
    });
    this.isConnected = false;
    this.socket?.disconnect();
  }

  setUsername(username: string) {
    this.username = username;
  }

  subscribe(event: string, handler: (data: any) => void) {
    if (this.isConnected) {
      this.socket?.on(event, handler);
    }
  }

  unsubscribe(event: string) {
    if (this.isConnected) {
      this.socket?.off(event);
    }
  }

  sendMessage(message: string) {
    const date = Date.now();
    if (this.isConnected) {
      this.socket?.emit('sendMessage', {
        username: this.username,
        message,
        date,
      });
    }
  }
}
