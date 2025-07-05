import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject }       from 'rxjs';
import { environment }   from '../../environments/environment';
import { Message }       from './message.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private apiUrl = `${environment.apiUrl}/messages`;
  messages: Message[] = [];
  messageListChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient) {}

  getMessages(): void {
    this.http
      .get<{ message: string; messages: Message[] }>(this.apiUrl)
      .subscribe({
        next: resp => {
          this.messages = resp.messages;
          this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
          this.messageListChangedEvent.next(this.messages.slice());
        },
        error: err => console.error('GET /messages failed', err)
      });
  }

  getMessage(id: string): Message | null {
    return this.messages.find(m => m.id === id) ?? null;
  }

  addMessage(newMsg: Message): void {
    if (!newMsg) return;
    newMsg.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; messageObj: Message }>(this.apiUrl, newMsg, { headers })
      .subscribe({
        next: resp => {
          this.messages.push(resp.messageObj);
          this.messageListChangedEvent.next(this.messages.slice());
        },
        error: err => console.error('POST /messages failed', err)
      });
  }

  updateMessage(orig: Message, updated: Message): void {
    if (!orig || !updated) return;
    updated.id = orig.id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(`${this.apiUrl}/${orig.id}`, updated, { headers })
      .subscribe({
        next: () => {
          const ix = this.messages.findIndex(m => m.id === orig.id);
          this.messages[ix] = updated;
          this.messageListChangedEvent.next(this.messages.slice());
        },
        error: err => console.error('PUT /messages failed', err)
      });
  }

  deleteMessage(msg: Message): void {
    if (!msg) return;
    this.http
      .delete(`${this.apiUrl}/${msg.id}`)
      .subscribe({
        next: () => {
          this.messages = this.messages.filter(m => m.id !== msg.id);
          this.messageListChangedEvent.next(this.messages.slice());
        },
        error: err => console.error('DELETE /messages failed', err)
      });
  }
}
