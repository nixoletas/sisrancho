import { AfterViewInit, ChangeDetectorRef, Component, NgModule } from '@angular/core';
import BRMenu from '@govbr-ds/core/dist/components/menu/menu';
import { CommonModule } from '@angular/common';
import { CanDeactivate, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

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
      iconClass: 'fas fa-person-military-rifle',
      label: 'Login',
      route: '/login',
    },
  ]

  constructor(
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) { }


  ngAfterViewInit() {
    this.instance = new BRMenu('.br-menu', document.querySelector('.br-menu'));

    this.cdr.detectChanges();
  }
}
