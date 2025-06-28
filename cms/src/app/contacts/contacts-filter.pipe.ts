import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({ name: 'contactsFilter' })
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): Contact[] {
    if (!term || term.trim().length === 0) {
      return contacts;
    }
    const lowerTerm = term.toLowerCase();
    const filtered = contacts.filter(c =>
      c.name.toLowerCase().includes(lowerTerm)
    );
    // if nothing matches, show full list
    return filtered.length > 0 ? filtered : contacts;
  }
}
