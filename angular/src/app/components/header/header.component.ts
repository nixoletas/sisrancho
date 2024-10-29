import { Component, ElementRef } from '@angular/core'

import BRHeader from '@govbr-ds/core/dist/components/header/header'
import { environment } from '../../../environments/environment.prod'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'br-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class BrHeaderComponent {
  public title = 'Sistema de Arranchamento Online'
  public subtitle = '9º Batalhão de Comunicações e Guerra Eletrônica'
  public signature: string = 'Ministério da Defesa'
  instance: any // Instância do componente angular

  constructor(private brHeader: ElementRef) { }
  ngAfterViewInit() {
    this.instance = new BRHeader('.br-header', this.brHeader.nativeElement.querySelector('.br-header'))
  }

  public image = {
    src: `${environment.ASSETS_PICS}/logo9bcom2.png`,
    alt: '9º B Com GE',
  }

  public links: any[] = [
    {
      href: 'http://intranet.9bcomge.eb.mil.br',
      name: 'Intranet 9º B Com GE',
      title: 'Intranet 9º B Com GE',
    },
    {
      href: 'http://intranet.9bcomge.eb.mil.br/sti/chamado',
      name: 'Chamado STI',
      target: '_blank',
      title: 'Chamado STI',
    },
  ]


}
