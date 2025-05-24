import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { Contact }           from './contact.model';
import { ContactService }    from './contact.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactDetailComponent],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact?: Contact;

  constructor(private cs: ContactService) {}

  ngOnInit() {
    this.cs.contactSelectedEvent.subscribe(
      (c: Contact) => this.selectedContact = c
    );
  }
}