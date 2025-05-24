import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { Document } from './document.model';
import { DocumentService }      from './document.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule,               
    DocumentListComponent,      
    DocumentDetailComponent     
  ],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument?: Document;

  constructor(private ds: DocumentService) {}

  ngOnInit() {
    this.ds.documentSelectedEvent.subscribe(
      (d: Document) => this.selectedDocument = d
    );
  }
}
