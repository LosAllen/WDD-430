import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';

import { Document }                 from '../document.model';
import { DocumentService }          from '../document.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document!: Document;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.document = this.documentService.getDocument(id)!;
    });
  }

  onEdit() {
    // Navigate to /documents/:id/edit
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    if (!this.document) return;
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }


  onView() {
    // If service injected a window ref, open a new tab
    window.open(this.document.url, '_blank');
  }
}
