import { AfterViewInit, Component } from '@angular/core';
import { OperacoesService } from '../../services/operacoes.service';

@Component({
  selector: 'br-operacoes',
  standalone: true,
  imports: [],
  templateUrl: './operacoes.component.html',
  styleUrl: './operacoes.component.scss'
})
export class OperacoesComponent implements AfterViewInit{
  items: any[] = []
  isLoading = true;

  constructor(private operacoesService: OperacoesService) {}

  ngAfterViewInit(): void {
    this.fetchData();
  }
  
  fetchData(): void {
    this.operacoesService.getOperacoes().subscribe({
      next: (response) => {
        this.items = response.data;
        this.isLoading = false;
      }
    });
  };
}
