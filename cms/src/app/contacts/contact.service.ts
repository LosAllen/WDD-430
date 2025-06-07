import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact }                  from './contact.model';
import { MOCKCONTACTS }             from './MOCKCONTACTS';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  private maxContactId: number;

  selectedContact = new Subject<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS.slice();
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | undefined {
    return this.contacts.find(c => c.id === id);
  }

  getMaxId(): number {
    let maxId = 0;
    for (const c of this.contacts) {
      const currentId = parseInt(c.id, 10);
      if (currentId > maxId) maxId = currentId;
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) return;
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  updateContact(original: Contact, updated: Contact) {
    if (!original || !updated) return;
    const pos = this.contacts.indexOf(original);
    if (pos < 0) return;
    updated.id = original.id;
    this.contacts[pos] = updated;
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}