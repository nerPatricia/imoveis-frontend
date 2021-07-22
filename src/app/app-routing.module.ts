import { ImoveisComponent } from './pages/imoveis/imoveis.component';
import { MainComponent } from './views/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorretoresComponent } from './pages/corretores/corretores.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { RelatoriosComponent } from './pages/relatorios-gerais/relatorios.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'imoveis',
        component: ImoveisComponent,
      },
      {
        path: 'corretores',
        component: CorretoresComponent,
      },
      {
        path: 'vendas',
        component: VendasComponent,
      },
      {
        path: 'relatorios',
        component: RelatoriosComponent,
      }
    ],
  },
  // {
  //   path: 'detail/:tipo/:id',
  //   component: GameDetailComponent,
  //   canActivate: [NonAuthGuard],
  // },
  // { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
