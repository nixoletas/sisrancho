import { Component, NgModule, NgModuleRef, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'br-dashboard',
  standalone: true,
  imports: [],
  providers: [NgModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userCpf: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userCpf = this.authService.getUserCpf(); // Obtém o CPF do usuário
  }

}
