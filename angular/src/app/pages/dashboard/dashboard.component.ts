import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ArranchamentoService } from '../../arranchamento.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'br-dashboard',
  standalone: true,
  imports: [CommonModule],
  providers: [NgModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userCpf: string | null = '';
  userPg: string | null = '';
  userNomeCompleto: string | null = '';
  arranchamentos: any[] = [];
  selectedDate: string = '';

  constructor(
    private authService: AuthService,
    private arranchamentoService: ArranchamentoService
  ) {}

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

  loadArranchamentos(cpf: string): void {
    this.arranchamentoService.getArranchamentos(cpf).subscribe((data) => {
      this.arranchamentos = data;
    });
  }

  onDateSelect(event: Event) {
    const input = event.target as HTMLInputElement; // Cast para HTMLInputElement
    const selectedDate = input.valueAsDate;
    if (selectedDate) {
      console.log(selectedDate); // Lógica para manipular a data
    }
  }

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement; // Especifica o tipo
    const selectedDate = input.valueAsDate;
    if (selectedDate) {
      // Lógica para quando a data está definida
      console.log(selectedDate);
    }
  }

  addArranchamento(): void {
    if (this.userCpf && this.selectedDate) {
      this.arranchamentoService.addArranchamento(this.userCpf, this.selectedDate).subscribe(() => {
        this.loadArranchamentos(this.userCpf!);
      });
    }
  }

  cancelArranchamento(date: string): void {
    if (this.userCpf) {
      this.arranchamentoService.cancelArranchamento(this.userCpf, date).subscribe(() => {
        this.loadArranchamentos(this.userCpf!);
      });
    }
  }

}
