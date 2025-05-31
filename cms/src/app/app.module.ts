import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';    

import { AppRoutingModule }   from './app-routing.module';

import { AppComponent }      from './app.component';
// Removed HeaderComponent   from './header.component';

// Removed DocumentsComponent      from './documents/documents.component';
// Removed DocumentListComponent   from './documents/document-list/document-list.component';
// Removed DocumentItemComponent   from './documents/document-item/document-item.component';
// Removed DocumentDetailComponent from './documents/document-detail/document-detail.component';
// Removed DocumentEditComponent   from './documents/document-edit/document-edit.component';

// Removed MessageListComponent from './messages/message-list/message-list.component';
// Removed MessageItemComponent from './messages/message-item/message-item.component';
// Removed MessageEditComponent from './messages/message-edit/message-edit.component';

// Removed ContactsComponent    from './contacts/contacts.component';
// Removed ContactListComponent from './contacts/contact-list/contact-list.component';
// Removed ContactItemComponent from './contacts/contact-item/contact-item.component';
// Removed ContactDetailComponent from './contacts/contact-detail/contact-detail.component';
// Removed ContactEditComponent   from './contacts/contact-edit/contact-edit.component';


import { DropdownDirective }     from './shared/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,

    // Documents
    DocumentEditComponent,  

    // Messages

    // Contacts
    
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
