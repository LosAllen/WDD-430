import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService }                   from '../message.service';

@Component({
  selector: 'app-message-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @ViewChild('subjectInput') subjectRef!: ElementRef;
  @ViewChild('msgTextInput') msgTextRef!: ElementRef;
  currentSender = 'Lincoln Allen';

  constructor(private ms: MessageService) {}

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const newMsg  = new Message(
      Math.random().toString(),
      subject,
      msgText,
      this.currentSender
    );
    this.ms.addMessage(newMsg);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value  = '';
  }
}