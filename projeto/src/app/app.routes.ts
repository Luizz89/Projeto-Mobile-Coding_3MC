import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'detalhes',
    loadComponent: () => import('./detalhes/detalhes.page').then( m => m.DetalhesPage)
  },
  {
path: 'resultado/:id',
    loadComponent: () => import('./resultado/resultado.page').then( m => m.ResultadoPage)
  },

];
