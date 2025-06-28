import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact }                  from './contact.model';
import { MOCKCONTACTS }             from './MOCKCONTACTS';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  private maxContactId = 0;
    private contactsUrl = 
    'https://ljacms-default-rtdb.firebaseio.com/contacts.json';

  selectedContact = new Subject<Contact>();

  constructor(private http: HttpClient) {}

  getContacts(): void {
    this.http.get<Contact[]>(this.contactsUrl).subscribe(
      contacts => {
        this.contacts = contacts || [];
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      error => console.error('Contacts GET failed', error)
    );
  }

  storeContacts(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(
        this.contactsUrl,
        JSON.stringify(this.contacts),
        { headers }
      )
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  private getMaxId(): number {
    return this.contacts.reduce((max, c) => {
      const id = +c.id;
      return id > max ? id : max;
    }, 0);
  }

  getContact(id: string): Contact | null {
    return this.contacts.find(c => c.id === id) ?? null;
  }

  addContact(newContact: Contact): void {
    if (!newContact) return;
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(orig: Contact, updated: Contact): void {
    if (!orig || !updated) return;
    const idx = this.contacts.findIndex(c => c.id === orig.id);
    if (idx < 0) return;
    updated.id = orig.id;
    this.contacts[idx] = updated;
    this.storeContacts();
  }

  deleteContact(contact: Contact): void {
    if (!contact) return;
    const idx = this.contacts.findIndex(c => c.id === contact.id);
    if (idx < 0) return;
    this.contacts.splice(idx, 1);
    this.storeContacts();
  }
}