import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicoPageComponent } from './pages/secoes/s1/servico/servico.component';
import { RamaisComponent } from './pages/ramais/ramais.component';
import { AdjuntoComponent } from './pages/institucional/adjunto/adjunto.component';
import { ComandanteComponent } from './pages/institucional/comandante/comandante.component';
import { DiretrizComponent } from './pages/institucional/diretriz/diretriz.component';
import { EnderecoComponent } from './pages/institucional/endereco/endereco.component';
import { InstitucionalComponent } from './pages/institucional/institucional.component';
import { MissaoComponent } from './pages/institucional/missao/missao.component';
import { SubordinacaoComponent } from './pages/institucional/subordinacao/subordinacao.component';
import { VisaoComponent } from './pages/institucional/visao/visao.component';

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
      path: 'institucional',
      children: [
        { path: '', component: InstitucionalComponent },
        { path: 'visao', component: VisaoComponent },
        { path: 'subordinacao', component: SubordinacaoComponent },
        { path: 'endereco', component: EnderecoComponent },
        { path: 'comandante', component: ComandanteComponent },
        { path: 'adjunto-de-comando', component: AdjuntoComponent },
        { path: 'missao', component: MissaoComponent },
        { path: 'diretriz', component: DiretrizComponent },
      ]
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
