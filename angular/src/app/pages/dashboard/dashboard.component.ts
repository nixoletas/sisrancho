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
  userPg: string | null = '';
  userNomeCompleto: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserData().subscribe({
      next: (user) => {
        this.userCpf = user.cpf;
        this.userPg = user.pg;
        this.userNomeCompleto = user.nomecompleto;
      },
      error: (err) => {
        console.error('Erro ao buscar dados do usuário:', err);
      }
    });
  }

}
