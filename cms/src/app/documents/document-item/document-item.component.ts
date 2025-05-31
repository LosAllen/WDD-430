import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Document } from '../document.model';


@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-document-item',
  standalone: true,
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent {
  @Input() document!: Document;
}
