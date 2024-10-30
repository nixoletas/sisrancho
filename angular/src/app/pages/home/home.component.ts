import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ButtonBalloonComponent } from '../../components/button-balloon/button-balloon.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    ButtonBalloonComponent,
],
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  imgSrc = `${environment.ASSETS_PICS}/calendario.jpg`
  bannerStVasc = `${environment.ASSETS_PICS}/st_vasconcelos.jpg`
  cardapioSrc = `/cardapio-logo.svg`

  public items: any[] = [
    {
      icon: 'fa fa-id-card',
      name: 'Sistemas Internos',
      route: 'http://sistemas.9bcomge.eb.mil.br',
      external: true
    },
    {
      icon: 'fa fa-utensils',
      name: 'Arranchamento',
      route: 'http://sistemas.9bcomge.eb.mil.br/sisrancho/',
      external: true
    },
    {
      icon: 'fas fa-person-military-rifle',
      name: 'Escala',
      route: '/s1/servico',
    },
  ]

}
