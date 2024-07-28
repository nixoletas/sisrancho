import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicoPageComponent } from './pages/secoes/s1/servico/servico.component';
import { RamaisComponent } from './pages/ramais/ramais.component';

export const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'ramais',
      component: RamaisComponent,
    },
    {
      path: 's1',
      children: [
        { path: 'servico', component: ServicoPageComponent },
      ]
    },
];
