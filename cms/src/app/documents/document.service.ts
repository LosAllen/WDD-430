import { Injectable, EventEmitter } from '@angular/core';
import { Document }                from './document.model';
import { MOCKDOCUMENTS }           from './MOCKDOCUMENTS';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    const doc = this.documents.find(d => d.id === id);
    return doc || null;
  }
}
