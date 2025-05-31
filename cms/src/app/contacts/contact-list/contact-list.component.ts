import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { Contact } from '../contact.model';
import { ContactService }    from '../contact.service';


@Component({
  imports: [CommonModule, ContactItemComponent, RouterModule],
  selector: 'app-contact-list',
  standalone: true,
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();

    this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => this.contacts = contacts
    );
  }
}