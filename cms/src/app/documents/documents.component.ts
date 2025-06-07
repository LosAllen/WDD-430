import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { Document } from './document.model';
import { DocumentService }      from './document.service';


@Component({
  imports: [CommonModule, DocumentDetailComponent, DocumentListComponent, RouterModule],
  selector: 'app-documents',
  standalone: true,
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument?: Document;

  constructor(private ds: DocumentService) {}

  ngOnInit() {
    this.ds.documentSelected.subscribe(
      (d: Document) => this.selectedDocument = d
    );
  }
}
