import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Message }                 from './message.model';
import { MOCKMESSAGES }            from './MOCKMESSAGES';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: Message[] = [];
  messageListChangedEvent = new Subject<Message[]>();
  private maxMessageId = 0;
  private messagesUrl =
    'https://ljacms-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient) {}

  getMessages(): void {
    this.http.get<Message[]>(this.messagesUrl).subscribe(
      (msgs) => {
        this.messages = msgs || [];
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) =>
          a.sender.localeCompare(b.sender)
        );
        this.messageListChangedEvent.next(this.messages.slice());
      },
      (error) => console.error('Messages GET failed', error)
    );
  }

  storeMessages(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(
        this.messagesUrl,
        JSON.stringify(this.messages),
        { headers }
      )
      .subscribe(() => {
        this.messageListChangedEvent.next(this.messages.slice());
      });
  }

  addMessage(newMsg: Message): void {
    if (!newMsg) return;
    this.maxMessageId++;
    newMsg.id = this.maxMessageId.toString();
    this.messages.push(newMsg);
    this.storeMessages();
  }

  updateMessage(orig: Message, updated: Message): void {
    if (!orig || !updated) return;
    const idx = this.messages.findIndex(m => m.id === orig.id);
    if (idx < 0) return;
    updated.id = orig.id;
    this.messages[idx] = updated;
    this.storeMessages();
  }

  deleteMessage(msg: Message): void {
    if (!msg) return;
    const idx = this.messages.findIndex(m => m.id === msg.id);
    if (idx < 0) return;
    this.messages.splice(idx, 1);
    this.storeMessages();
  }

  private getMaxId(): number {
    return this.messages.reduce((max, m) => {
      const id = +m.id;
      return id > max ? id : max;
    }, 0);
  }

  getMessage(id: string): Message | null {
    return this.messages.find(m => m.id === id) ?? null;
  }
}