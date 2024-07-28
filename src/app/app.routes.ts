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
import { AditamentosComponent } from './pages/secoes/s1/aditamentos/aditamentos.component';
import { AssJurdComponent } from './pages/secoes/s1/ass-jurd/ass-jurd.component';
import { AvisosComponent } from './pages/secoes/s1/avisos/avisos.component';
import { BoletinsComponent } from './pages/secoes/s1/boletins/boletins.component';
import { ModelosComponent } from './pages/secoes/s1/modelos/modelos.component';
import { OsComponent } from './pages/secoes/s1/os/os.component';
import { S1PageComponent } from './pages/secoes/s1/s1.component';
import { SecretariaComponent } from './pages/secoes/s1/secretaria/secretaria.component';

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
        { path: '', component: S1PageComponent },
        { path: 'boletins', component: BoletinsComponent },
        { path: 'avisos', component: AvisosComponent },
        { path: 'servico', component: ServicoPageComponent },
        { path: 'aditamentos', component: AditamentosComponent },
        { path: 'modelos', component: ModelosComponent },
        { path: 'os', component: OsComponent },
        { path: 'ass-jurd', component: AssJurdComponent },
        { path: 'secretaria', component: SecretariaComponent },
      ]
    },
];
