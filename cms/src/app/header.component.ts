import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { DropdownDirective } from './shared/dropdown.directive';


@Component({
  imports: [CommonModule, DropdownDirective, RouterModule],
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {}