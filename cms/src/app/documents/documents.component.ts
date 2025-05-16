import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { Document } from './document.model';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule,               // for *ngIf
    DocumentListComponent,      // so <app-document-list> is known
    DocumentDetailComponent     // so <app-document-detail> is known
  ],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  selectedDocument?: Document;
  onDocumentSelected(doc: Document) {
    this.selectedDocument = doc;
  }
}
