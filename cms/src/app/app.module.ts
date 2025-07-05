import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }     from '@angular/router';
import { DragDropModule }   from '@angular/cdk/drag-drop';
import { HeaderComponent } from './header.component';

import { AppComponent }        from './app.component';
import { routes }              from './app.routes';
import { DocumentsComponent }  from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentEditComponent }   from './documents/document-edit/document-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { ContactsComponent }    from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentDetailComponent,
    DocumentEditComponent,
    MessageListComponent,
    MessageItemComponent,
    MessageEditComponent,
    ContactsComponent,
    ContactListComponent,
    ContactItemComponent,
    ContactEditComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    DragDropModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
