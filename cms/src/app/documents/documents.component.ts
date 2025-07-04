import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { Document } from './document.model';
import { DocumentService }      from './document.service';
import { DocumentEditComponent } from './document-edit/document-edit.component';


@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, DocumentListComponent, DocumentDetailComponent, DocumentEditComponent],
  selector: 'app-documents',
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
