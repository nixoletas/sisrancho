import { AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { AniversariantesService } from '../aniversariantes/aniversariantes.service';
import { DatePipe } from '@angular/common';
import { CommonModule, registerLocaleData } from '@angular/common';
import BRModal from '@govbr-ds/core/dist/components/modal/modal';

@Component({
  selector: 'br-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  providers: [DatePipe]
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('modalRef', {static: false}) modalRef: ElementRef | any;

  instance: any;
  data: any[] = [];
  currentMonth: string;
  isLoading = signal(true);

  constructor(private aniversariantesService: AniversariantesService, private datePipe: DatePipe) {
    this.currentMonth = this.datePipe.transform(new Date(), 'MMMM', undefined, 'pt-BR') || '';
  }

  ngAfterViewInit(): void {
    this.instance = new BRModal('.br-menu', document.querySelector('.br-menu'));
    this.fetchData();
  }

  fetchData(): void {
    this.aniversariantesService.getAllData().subscribe({
      next: (response) => {  
        this.isLoading.set(false);
        const currentMonth = new Date().getMonth(); // Mês atual (0-11)
  
        // Filtra os dados para exibir apenas os aniversariantes do mês corrente
        this.data = response.filter((item: any) => {
          const birthdate = new Date(item.attributes['birthdate']);
  
          return birthdate.getMonth() === currentMonth;
        });
    
        // Ordena pela data de aniversário, priorizando o aniversário de hoje
        this.data.sort((a, b) => {
          const birthdateA = new Date(a.attributes['birthdate']);
          const birthdateB = new Date(b.attributes['birthdate']);
  
          const isTodayA = this.isBirthdayToday(a.attributes['birthdate']);
          const isTodayB = this.isBirthdayToday(b.attributes['birthdate']);
  
          if (isTodayA && !isTodayB) {
            return -1; // Aniversário de hoje vem primeiro
          } else if (!isTodayA && isTodayB) {
            return 1; // Aniversário de hoje vem primeiro
          } else {
            return birthdateA.getDate() - birthdateB.getDate();
          }
        });
      },
      error: (err) => {
        console.error('Erro ao buscar dados do Strapi');
      }
    });
  }

  isBirthdayToday(birthdate: string): boolean {
    const today = new Date();
    const birthDate = new Date(birthdate);

    return today.getUTCDate() === birthDate.getUTCDate() &&
           today.getUTCMonth() === birthDate.getUTCMonth();
  }

  close() {
    this.modalRef.nativeElement.style.display = 'none';
  }

}
