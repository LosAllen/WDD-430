import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { RouterModule } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DragDropModule],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  originalContact!: Contact;
  contact!: Contact;
  groupContacts: Contact[] = [];
  editMode = false;
  id!: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        this.contact = new Contact('','','','','',[]);
        return;
      }
      this.originalContact = this.contactService.getContact(id)!;
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      this.groupContacts = [...(this.originalContact.group || [])];
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      '',
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(c: Contact): boolean {
    if (!c || c.id === this.contact.id) return true;
    return this.groupContacts.some(m => m.id === c.id);
  }

  addToGroup(event: any) {
    const selectedContact: Contact = event.dragData;
    if (this.isInvalidContact(selectedContact)) return;
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(i: number) {
    if (i >= 0 && i < this.groupContacts.length) {
      this.groupContacts.splice(i, 1);
    }
  }

  onDrop(event: CdkDragDrop<Contact[]>) {
    if (event.previousContainer === event.container) return;

    const dropped: Contact = event.item.data;
    if (!this.isInvalidContact(dropped)) {
      this.groupContacts.push(dropped);
    }
  }
}