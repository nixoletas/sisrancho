import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'br-sti',
  standalone: true,
  imports: [MarkdownModule],
  template: `
  <h2><strong>STI do 9º B Com GE</strong></h2>
  <markdown [src]="markdownSrc"></markdown>
  <div class="br-divider my-6"></div>
  <a href="https://sti.9bcomge.eb.mil.br/" target="_blank"><h2 class="rounder-lg border-solid-md	 bg-blue-80 text-pure-0">Painel STI <i class="fa fa-link"></i></h2></a>
`,
})
export class StiComponent {
  public markdownSrc: string;

  constructor() {
    this.markdownSrc = `${environment.ASSETS_MD}/sti.md`
  }
}
