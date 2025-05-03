import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent }        from './app.component';
import { HeaderComponent }     from './header.component';
import { ContactsComponent }   from './contacts/contacts.component';
import { ContactListComponent }   from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';

// if you already have routes defined, import them; otherwise you can omit RouterModule
import { routes } from './app.routes';  

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)   // or just [] if you haven’t set up routing yet
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
