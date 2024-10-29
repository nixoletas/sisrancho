import { AfterViewInit, ChangeDetectorRef, Component, NgModule } from '@angular/core';
import BRMenu from '@govbr-ds/core/dist/components/menu/menu';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'br-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class BrMenuComponent implements AfterViewInit {
  instance: any

  menuItems = [
    {
      iconClass: 'fa-home',
      label: 'Home',
      route: '/home',
      role: 'menuitem'
    },
    {
      iconClass: 'fas fa-person-military-rifle',
      label: 'Arranchar',
      route: '/s1/servico',
    },
    {
      iconClass: 'fa-feather',
      label: 'Administrador',
      children: [
        {
          iconClass: 'fa-arrow-right',
          label: 'Cadastro de militar',
          route: 'institucional/visao'
        },
        {
          iconClass: 'fa-map-pin',
          label: 'Visualizar usuários',
          route: 'institucional/endereco'
        }
      ]
    },
  ]

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.instance = new BRMenu('.br-menu', document.querySelector('.br-menu'));

    this.cdr.detectChanges();
  }
}
