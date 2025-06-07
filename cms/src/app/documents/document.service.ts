import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  private maxDocumentId: number;

  documentSelected = new Subject<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS.slice();
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | undefined {
    return this.documents.find(doc => doc.id === id);
  }

  getMaxId(): number {
    let maxId = 0;
    for (const doc of this.documents) {
      const currentId = parseInt(doc.id, 10);
      if (currentId > maxId) maxId = currentId;
    }
    return maxId;
  }

  addDocument(newDoc: Document) {
    if (!newDoc) return;
    this.maxDocumentId++;
    newDoc.id = this.maxDocumentId.toString();
    this.documents.push(newDoc);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(original: Document, updated: Document) {
    if (!original || !updated) return;
    const pos = this.documents.indexOf(original);
    if (pos < 0) return;
    updated.id = original.id;
    this.documents[pos] = updated;
    this.documentListChangedEvent.next(this.documents.slice());
  }

  deleteDocument(doc: Document) {
    if (!doc) return;
    const pos = this.documents.indexOf(doc);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }
}
