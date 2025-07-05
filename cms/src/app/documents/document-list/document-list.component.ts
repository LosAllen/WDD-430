import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { DocumentService }      from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, DocumentItemComponent],
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private sub!: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.getDocuments();
    this.sub = this.documentService.documentListChangedEvent
      .subscribe((docs: Document[]) => {
        this.documents = docs;
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}