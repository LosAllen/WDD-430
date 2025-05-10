import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('subjectInput') subjectRef!: ElementRef;
  @ViewChild('msgTextInput') msgTextRef!: ElementRef;
  currentSender = 'Lincoln Allen';

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const newMsg = new Message(Math.random(), subject, msgText, this.currentSender);
    this.addMessageEvent.emit(newMsg);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}