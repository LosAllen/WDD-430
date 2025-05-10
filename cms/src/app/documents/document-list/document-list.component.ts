import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document as AppDocument } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item.component';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, DocumentItemComponent],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  documents: AppDocument[] = [
    new AppDocument('d1', 'Passport', 'My passport file', '/files/passport.pdf', []),
    new AppDocument('d2', 'Resume',   'Latest résumé',     '/files/resume.pdf',   [])
  ];
}