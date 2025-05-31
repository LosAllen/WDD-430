import { Injectable, EventEmitter } from '@angular/core';
import { Document }                from './document.model';
import { MOCKDOCUMENTS }           from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  documentChangedEvent = new EventEmitter<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS.slice(); // copy
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | undefined {
    return this.documents.find(doc => doc.id === id);
  }

  addDocument(newDoc: Document) {
    this.documents.push(newDoc);
    this.documentChangedEvent.emit(this.documents.slice());
  }

  updateDocument(original: Document, updated: Document) {
    const pos = this.documents.indexOf(original);
    if (pos < 0) return;
    this.documents[pos] = updated;
    this.documentChangedEvent.emit(this.documents.slice());
  }

  deleteDocument(doc: Document) {
    if (!doc) return;
    const pos = this.documents.indexOf(doc);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
}