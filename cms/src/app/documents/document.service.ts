import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject }       from 'rxjs';
import { environment }   from '../../environments/environment';
import { Document }      from './document.model';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private apiUrl = `${environment.apiUrl}/documents`;
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  documentSelected = new Subject<Document>();

  constructor(private http: HttpClient) {}

  getDocuments(): void {
    this.http
      .get<{ message: string; documents: Document[] }>(this.apiUrl)
      .subscribe({
        next: resp => {
          this.documents = resp.documents;
          this.documents.sort((a, b) => a.name.localeCompare(b.name));
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: err => console.error('GET /documents failed', err)
      });
  }

  getDocument(id: string): Document | null {
    return this.documents.find(d => d.id === id) ?? null;
  }

  addDocument(newDoc: Document): void {
    if (!newDoc) return;
    newDoc.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; document: Document }>(this.apiUrl, newDoc, { headers })
      .subscribe({
        next: resp => {
          this.documents.push(resp.document);
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: err => console.error('POST /documents failed', err)
      });
  }

  updateDocument(orig: Document, updated: Document): void {
    if (!orig || !updated) return;
    updated.id = orig.id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(`${this.apiUrl}/${orig.id}`, updated, { headers })
      .subscribe({
        next: () => {
          const ix = this.documents.findIndex(d => d.id === orig.id);
          this.documents[ix] = updated;
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: err => console.error('PUT /documents failed', err)
      });
  }

  deleteDocument(doc: Document): void {
    if (!doc) return;
    this.http
      .delete(`${this.apiUrl}/${doc.id}`)
      .subscribe({
        next: () => {
          this.documents = this.documents.filter(d => d.id !== doc.id);
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: err => console.error('DELETE /documents failed', err)
      });
  }
}
