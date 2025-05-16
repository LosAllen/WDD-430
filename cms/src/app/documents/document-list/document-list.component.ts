import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item.component';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [
    CommonModule, 
    DocumentItemComponent    // so <app-document-item> is known
  ],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('d1', 'CIT 260 - OOP',      'Learn OOP basics',    '/files/cit260.pdf', []),
    new Document('d2', 'CIT 366 - Web Dev',  'Full Stack MEAN',     '/files/cit366.pdf', []),
    new Document('d3', 'CIT 425 - Warehousing','Data warehousing',   '/files/cit425.pdf', []),
    new Document('d4', 'CIT 460 - Enterprise','Enterprise dev',      '/files/cit460.pdf', []),
    new Document('d5', 'CIT 495 - Practicum','Senior practicum',    '/files/cit495.pdf', [])
  ];

  onSelectedDocument(doc: Document) {
    this.selectedDocumentEvent.emit(doc);
  }
}