import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import BRCarousel from '@govbr-ds/core/dist/components/carousel/carousel';
import { environment } from '../../../environments/environment';
import { CarouselService } from './carousel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'br-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class BrCarousel implements AfterViewInit, OnDestroy {

  @ViewChild('carousel') carousel: any;
  instance: any;
  currentIndex: number = 0;
  items: any[] = [];
  isLoading: boolean = true;
  intervalId: any;
  countdownIntervalId: any;
  countdown: number = 5; // Initial countdown value in seconds

  constructor(
    private carouselService: CarouselService,
    private brCarousel: ElementRef
  ) { }

  ngAfterViewInit() {
    this.loadGalerias();
    this.instance = new BRCarousel('.br-carousel', this.brCarousel.nativeElement.querySelector('.br-carousel'));

    // Iniciar rotação automática
    this.startAutoSlide();
  }

  loadGalerias(): void {
    this.carouselService.getGalerias().subscribe(response => {
      this.items = response.data.map(item => ({
        image: `${environment.STRAPI_API}${item.attributes.banner.data.attributes.formats.large.url}`,
        title: item.attributes.titulo,
        subtitle: item.attributes.subtitulo,
        link: item.attributes.link
      }));
      this.isLoading = false;

      // Atualizar carrossel após carregar itens
    });
  }

  startAutoSlide(): void {
    this.resetCountdown();
    this.intervalId = setInterval(() => {
      this.nextSlide();
      this.resetCountdown();
    }, 5000); // Mudar slide a cada 5 segundos
  }

  stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.countdownIntervalId) {
      clearInterval(this.countdownIntervalId);
      this.countdownIntervalId = null;
    }
  }

  pauseAutoSlide(): void {
    this.stopAutoSlide();
    this.countdown = 5; // Reset countdown to 5 when paused
  }

  resumeAutoSlide(): void {
    if (!this.intervalId) {
      this.startAutoSlide();
    }
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.items.length - 1;
    this.resetCountdown();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.resetCountdown();
  }

  resetCountdown() {
    this.countdown = 5;
    if (this.countdownIntervalId) {
      clearInterval(this.countdownIntervalId);
    }
    this.countdownIntervalId = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      }
    }, 1000);
  }

  ngOnDestroy() {
    // Limpar o intervalo ao destruir o componente
    this.stopAutoSlide();
  }
}
