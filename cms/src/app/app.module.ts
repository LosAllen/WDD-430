import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }     from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent }      from './app.component';
import { HeaderComponent }   from './header.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { routes } from './app.routes';

import { DocumentsComponent }      from './documents/documents.component';
import { DocumentListComponent }   from './documents/document-list/document-list.component';
import { DocumentItemComponent }   from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';

import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';

import { ContactsComponent }    from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    // Documents
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,

    // Messages
    MessageListComponent,
    MessageItemComponent,
    MessageEditComponent,

    // Contacts
    ContactsComponent,
    ContactListComponent,
    ContactItemComponent,
    ContactDetailComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
