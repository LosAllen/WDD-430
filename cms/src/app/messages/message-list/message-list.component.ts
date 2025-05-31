import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { Message } from '../message.model';
import { MessageService }       from '../message.service';


@Component({
  imports: [CommonModule, MessageEditComponent, MessageItemComponent, RouterModule],
  selector: 'app-message-list',
  standalone: true,
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
