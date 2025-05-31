import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';


@Component({
  imports: [CommonModule, ContactsComponent, DocumentsComponent, HeaderComponent, MessageListComponent, RouterModule],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {}