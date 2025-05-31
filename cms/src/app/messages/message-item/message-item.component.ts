import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';


@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-message-item',
  standalone: true,
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  messageSenderName = '';

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    const senderContact: Contact | null = this.contactService.getContact(this.message.sender) ?? null; 
      this.contactService.getContact(this.message.sender);
    this.messageSenderName = senderContact 
      ? senderContact.name 
      : 'Unknown';
  }
}