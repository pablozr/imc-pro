import { Routes } from '@angular/router';
import { AuthService } from './modules/global/services/auth/auth.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadComponent: () => import('./modules/global/pages/signin/signin.component').then((m) => m.SigninComponent),
    canActivate: [AuthService]
  },
  {
    path: 'home',
    loadComponent: () => import('./modules/global/pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [AuthService]
  },
  {
    path: 'imc-calculator',
    loadComponent: () => import('./modules/imc/pages/imc-calculator/imc-calculator.component').then((m) => m.ImcCalculatorComponent),
    canActivate: [AuthService]
  },
  {
    path: 'history',
    loadComponent: () => import('./modules/imc/pages/history/history.component').then((m) => m.HistoryComponent),
    canActivate: [AuthService]
  },
  {
    path: 'messages',
    loadComponent: () => import('./modules/messages/pages/messages/messages.component').then((m) => m.MessagesComponent),
    canActivate: [AuthService]
  },
  {
    path: 'transactions',
    loadComponent: () => import('./modules/transactions/pages/transactions/transactions.component').then((m) => m.TransactionComponent),
    canActivate: [AuthService]
  },
  {
    path: '**',
    loadComponent: () => import('./modules/global/pages/not-found/not-found.component').then((m) => m.NotFoundComponent)
  }
];
