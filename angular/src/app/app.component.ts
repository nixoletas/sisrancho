import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrMenuComponent } from './components/menu/menu.component';
import { BrHeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BrMenuComponent, BrHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  title = 'sisrancho';
}
