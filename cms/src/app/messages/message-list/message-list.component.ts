import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { Message } from '../message.model';
import { MessageService }       from '../message.service';
import { Subscription } from 'rxjs';


@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MessageItemComponent, MessageEditComponent],
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  private sub!: Subscription;
  constructor(private ms: MessageService) {}

  ngOnInit() {
    this.ms.getMessages();
    this.sub = this.ms.messageListChangedEvent
      .subscribe((msgs: Message[]) => {
         this.messages = msgs;
       });
  }

  onAddMessage(msg: Message) {
    this.sub.unsubscribe();
  }
}
