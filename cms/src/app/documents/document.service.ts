import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  private maxDocumentId = 0;
  private documentsUrl =
    'https://ljacms-default-rtdb.firebaseio.com/documents.json';

  documentSelected = new Subject<Document>();

  constructor(private http: HttpClient) {}

  getDocuments(): void {
    this.http.get<Document[]>(this.documentsUrl).subscribe(
      (docs) => {
        this.documents = docs || [];
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error) => console.error('Documents GET failed', error)
    );
  }

  storeDocuments(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(
        this.documentsUrl,
        JSON.stringify(this.documents),
        { headers }
      )
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  private getMaxId(): number {
    return this.documents.reduce((max, d) => {
      const id = +d.id;
      return id > max ? id : max;
    }, 0);
  }

  getDocument(id: string): Document | null {
    return this.documents.find(d => d.id === id) ?? null;
  }

  addDocument(newDoc: Document): void {
    if (!newDoc) return;
    this.maxDocumentId++;
    newDoc.id = this.maxDocumentId.toString();
    this.documents.push(newDoc);
    this.storeDocuments();
  }

  updateDocument(orig: Document, updated: Document): void {
    if (!orig || !updated) return;
    const idx = this.documents.findIndex(d => d.id === orig.id);
    if (idx < 0) return;
    updated.id = orig.id;
    this.documents[idx] = updated;
    this.storeDocuments();
  }

  deleteDocument(doc: Document): void {
    if (!doc) return;
    const idx = this.documents.findIndex(d => d.id === doc.id);
    if (idx < 0) return;
    this.documents.splice(idx, 1);
    this.storeDocuments();
  }
}
