import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicoPageComponent } from './pages/secoes/s1/servico/servico.component';

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
      path: 's1',
      children: [
        { path: 'servico', component: ServicoPageComponent },
      ]
    },
];
