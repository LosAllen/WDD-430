import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { Message } from '../message.model';
import { MessageService }       from '../message.service';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [ CommonModule, MessageItemComponent, MessageEditComponent ],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private ms: MessageService) {}

  ngOnInit() {
    this.messages = this.ms.getMessages();
    this.ms.messageChangedEvent.subscribe(
      (msgs: Message[]) => this.messages = msgs
    );
  }

  onAddMessage(msg: Message) {
    this.ms.addMessage(msg);
  }
}
