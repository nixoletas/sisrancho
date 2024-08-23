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
        const today = new Date();
  
        this.data = response.data.filter((item: any) => {
          const birthdate = new Date(item.attributes['birthdate']);
          return birthdate.getMonth() === currentMonth;
        });
  
        // Ordenar pela data de aniversário, priorizando o aniversário de hoje
        this.data.sort((a, b) => {
          const birthdateA = new Date(a.attributes['birthdate']);
          const birthdateB = new Date(b.attributes['birthdate']);
  
          const isTodayA = this.isBirthdayToday(a.attributes['birthdate']);
          const isTodayB = this.isBirthdayToday(b.attributes['birthdate']);
  
          if (isTodayA && !isTodayB) {
            return -1; // a should come first
          } else if (!isTodayA && isTodayB) {
            return 1; // b should come first
          } else {
            // If neither or both are today, sort by date
            return birthdateA.getDate() - birthdateB.getDate();
          }
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
