import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [ CommonModule, MessageItemComponent, MessageEditComponent ],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [
    
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
