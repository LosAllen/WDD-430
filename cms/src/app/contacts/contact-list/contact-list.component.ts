import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { Contact } from '../contact.model';
import { ContactService }    from '../contact.service';
import { Subscription } from 'rxjs';
import { DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  imports: [CommonModule, ContactItemComponent, RouterModule, DragDropModule],
  selector: 'app-contact-list',
  standalone: true,
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  private subscription!: Subscription;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactsList: Contact[]) => {
        this.contacts = contactsList;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private sortContactsByTeam() {
    const all = [...this.contacts];
    const sorted: Contact[] = [];

    // 1) Teams first (contacts with non-empty .group)
    all
      .filter(c => c.group?.length)
      .forEach(team => {
        sorted.push(team);
        team.group!.forEach(memberRef => {
          const member = all.find(c => c.id === memberRef.id);
          if (member) sorted.push(member);
        });
      });

    // 2) Then everyone else
    const seen = new Set(sorted.map(c => c.id));
    all.forEach(c => {
      if (!seen.has(c.id)) sorted.push(c);
    });
  }
}