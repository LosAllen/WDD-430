import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject }       from 'rxjs';
import { environment }   from '../../environments/environment';
import { Contact }       from './contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contacts`;
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  selectedContact = new Subject<Contact>();

  constructor(private http: HttpClient) {}

  getContacts(): void {
    this.http
      .get<{ message: string; contacts: Contact[] }>(this.apiUrl)
      .subscribe({
        next: resp => {
          this.contacts = resp.contacts;
          this.contacts.sort((a, b) => a.name.localeCompare(b.name));
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error: err => console.error('GET /contacts failed', err)
      });
  }

  getContact(id: string): Contact | null {
    return this.contacts.find(c => c.id === id) ?? null;
  }

  addContact(newContact: Contact): void {
    if (!newContact) return;
    newContact.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; contact: Contact }>(this.apiUrl, newContact, { headers })
      .subscribe({
        next: resp => {
          this.contacts.push(resp.contact);
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error: err => console.error('POST /contacts failed', err)
      });
  }

  updateContact(orig: Contact, updated: Contact): void {
    if (!orig || !updated) return;
    updated.id = orig.id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(`${this.apiUrl}/${orig.id}`, updated, { headers })
      .subscribe({
        next: () => {
          const ix = this.contacts.findIndex(c => c.id === orig.id);
          this.contacts[ix] = updated;
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error: err => console.error('PUT /contacts failed', err)
      });
  }

  deleteContact(contact: Contact): void {
    if (!contact) return;
    this.http
      .delete(`${this.apiUrl}/${contact.id}`)
      .subscribe({
        next: () => {
          this.contacts = this.contacts.filter(c => c.id !== contact.id);
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error: err => console.error('DELETE /contacts failed', err)
      });
  }
}
