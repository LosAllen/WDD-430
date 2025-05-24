import { Injectable, EventEmitter } from '@angular/core';
import { Message }                 from './message.model';
import { MOCKMESSAGES }            from './MOCKMESSAGES';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: Message[] = [];
  messageSelectedEvent = new EventEmitter<Message>();
  messageChangedEvent  = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message | null {
    const m = this.messages.find(msg => msg.id === id);
    return m || null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
