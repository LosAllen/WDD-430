import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document | null = null;
  document: Document = new Document('', '', '', '', []);
  editMode = false;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (!id) return;

    const doc = this.documentService.getDocument(id);
    if (!doc) return;

    this.originalDocument = doc;
    this.document = { ...doc };
    this.editMode = true;
  }

  onSubmit(form: NgForm) {
    const newDoc = new Document(
      '',
      form.value.name,
      form.value.description,
      form.value.url,
      form.value.children || []
    );

    if (this.editMode && this.originalDocument) {
      this.documentService.updateDocument(this.originalDocument, newDoc);
    } else {
      this.documentService.addDocument(newDoc);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
