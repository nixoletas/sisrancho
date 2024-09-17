import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OperacoesService } from '../../services/operacoes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'br-postagem-detalhe',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './postagem-detalhe.component.html',
  styleUrl: './postagem-detalhe.component.scss'
})
export class PostagemDetalheComponent implements OnInit {
  postagem: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private operacoesService: OperacoesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchPostagem(id);
      }
    });
  }

  fetchPostagem(id: string): void {
    this.operacoesService.getOperacaoById(id).subscribe({
      next: (response) => {
        this.postagem = response.data;
        this.isLoading = false;
        console.log(this.postagem)
      }
    });
  }

}
