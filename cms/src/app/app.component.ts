import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';


@Component({
  imports: [CommonModule, HeaderComponent, RouterModule],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {}