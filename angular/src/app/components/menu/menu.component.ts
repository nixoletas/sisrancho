import { AfterViewInit, ChangeDetectorRef, Component, NgModule } from '@angular/core';
import BRMenu from '@govbr-ds/core/dist/components/menu/menu';
import { CommonModule } from '@angular/common';
import { CanDeactivate, Route, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

interface MenuItem {
  iconClass: string;
  label: string;
  route?: string;
  action?: () => void;
}


@Component({
  selector: 'br-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class BrMenuComponent implements AfterViewInit {
  instance: any

  menuItems: MenuItem[] = this.authService.isAuthenticated() ? [
    {
      iconClass: 'fas fa-person-military-rifle',
      label: 'Dashboard',
      route: 'dashboard'
    },
    {
      iconClass: 'fas fa-person-military-rifle',
      label: 'Logout',
      action: () => this.logout()
    },
  ] : [
    {
      iconClass: 'fas fa-person-military-rifle',
      label: 'Login',
      route: '/login',
    },
  ]

  constructor(
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) { }


  ngAfterViewInit() {
    this.instance = new BRMenu('.br-menu', document.querySelector('.br-menu'));

    this.cdr.detectChanges();
  }

  logout(): void {
    this.authService.logout().subscribe({
        next: (response) => {
            console.log('LogOut bem-sucedido', response);
            this.router.navigate(['/home']).then(() => {
                window.location.reload();
            });
        },
        error: (error) => {
            console.error('Erro ao fazer logout', error);
        }
    });
  }
}
