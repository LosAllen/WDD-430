import { Component, Input } from '@angular/core';
import { CommonModule }     from '@angular/common';
import { Document as AppDocument } from '../document.model';

@Component({
  selector: 'app-document-item',
  standalone: true,
  imports: [CommonModule],
  template: `<a class="list-group-item">{{ document.name }}</a>`
})
export class DocumentItemComponent {
  @Input() document!: AppDocument;
}