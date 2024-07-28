import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, OnInit } from '@angular/core';
import { AniversariantesService } from './aniversariantes.service';

registerLocaleData(localePt);

@Component({
  selector: 'br-aniversariantes',
  templateUrl: './aniversariantes.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./aniversariantes.component.scss'],
  providers: [DatePipe]
})
export class AniversariantesComponent implements OnInit {
  data: any[] = [];
  currentMonth: string;

  constructor(private aniversariantesService: AniversariantesService, private datePipe: DatePipe) {
    this.currentMonth = this.datePipe.transform(new Date(), 'MMMM', undefined, 'pt-BR') || '';
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.aniversariantesService.getCollection().subscribe({
      next: (response) => {
        const currentMonth = new Date().getMonth();
        this.data = response.data.filter((item: any) => {
          const birthdate = new Date(item.attributes['birthdate']);
          return birthdate.getMonth() === currentMonth;
        });

        // Ordenar pela data de aniversário
        this.data.sort((a, b) => {
          const dateA = new Date(a.attributes['birthdate']).getDate();
          const dateB = new Date(b.attributes['birthdate']).getDate();
          return dateA - dateB;
        });
      },
      error: (err) => {
        console.error('Erro ao buscar dados do Strapi', err);
      }
    });
  }

  isBirthdayToday(birthdate: string): boolean {
    const today = new Date();
    const birthDate = new Date(birthdate);

    return today.getUTCDate() === birthDate.getUTCDate() &&
      today.getUTCMonth() === birthDate.getUTCMonth();
  }
}
