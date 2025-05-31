import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, Input } from '@angular/core';


@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-contact-item',
  standalone: true,
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
  @Input() contact: any;
}