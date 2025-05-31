import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { DocumentService }      from '../document.service';


@Component({
  imports: [CommonModule, DocumentItemComponent, RouterModule],
  selector: 'app-document-list',
  standalone: true,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    // 1) load the initial list
    this.documents = this.documentService.getDocuments();

    // 2) subscribe so that we refresh if the array ever changes
    this.documentService.documentChangedEvent.subscribe(
      (docs: Document[]) => (this.documents = docs)
    );
  }
}