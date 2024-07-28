import { Component } from '@angular/core';
import { NewsComponent } from '../../components/news/news.component';

@Component({
  selector: 'br-noticias',
  standalone: true,
  imports: [NewsComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.scss'
})
export class NoticiasComponent { }
