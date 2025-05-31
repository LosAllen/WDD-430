import { Injectable, EventEmitter } from '@angular/core';
import { Contact }                  from './contact.model';
import { MOCKCONTACTS }             from './MOCKCONTACTS';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private contacts: Contact[] = [];
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();


  constructor() {
    this.contacts = MOCKCONTACTS.slice();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | undefined {
    return this.contacts.find(c => c.id === id);
  }

  addContact(newC: Contact) {
    this.contacts.push(newC);
    this.contactChangedEvent.emit(this.contacts.slice());
  }

  updateContact(orig: Contact, updated: Contact) {
    const pos = this.contacts.indexOf(orig);
    if (pos < 0) return;
    this.contacts[pos] = updated;
    this.contactChangedEvent.emit(this.contacts.slice());
  }

  deleteContact(c: Contact) {
    if (!c) return;
    const pos = this.contacts.indexOf(c);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}