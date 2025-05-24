import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { DocumentService }      from '../document.service';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [
    CommonModule, 
    DocumentItemComponent
  ],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

export class DocumentListComponent {
  documents: Document[] = [];

  constructor(private docService: DocumentService) {}

  ngOnInit() {
    this.documents = this.docService.getDocuments();
  }

  onSelectedDocument(doc: Document) {
    this.docService.documentSelectedEvent.emit(doc);
  }
}