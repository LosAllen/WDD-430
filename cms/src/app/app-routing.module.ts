// src/app/app-routing.module.ts
import { NgModule }       from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocumentsComponent }      from './documents/documents.component';
import { DocumentListComponent }   from './documents/document-list/document-list.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentEditComponent }   from './documents/document-edit/document-edit.component';

import { MessageListComponent }    from './messages/message-list/message-list.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';

import { ContactsComponent }    from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent }   from './contacts/contact-edit/contact-edit.component';

const appRoutes: Routes = [
  // When path is empty, redirect to “/documents” by default:
  { path: '',   redirectTo: '/documents', pathMatch: 'full' },

  // Top‐level routes:
  { 
    path: 'documents', 
    component: DocumentsComponent,
    children: [
      { path: 'new',        component: DocumentEditComponent },
      { path: ':id',        component: DocumentDetailComponent },
      { path: ':id/edit',   component: DocumentEditComponent }
    ]
  },

  { 
    path: 'messages',
    component: MessageListComponent ,
    children: [
        { path: 'new',    component: MessageEditComponent },
        { path: ':id/edit', component: MessageEditComponent }
    ]
  },

  {
    path: 'contacts', component: ContactsComponent,
    children: [
        { path: 'new',     component: ContactEditComponent },
        { path: ':id',     component: ContactDetailComponent },
        { path: ':id/edit', component: ContactEditComponent }
    ]
},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
