import { ImoveisComponent } from './pages/imoveis/imoveis.component';
import { MainComponent } from './views/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorretoresComponent } from './pages/corretores/corretores.component';

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
