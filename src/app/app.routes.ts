import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProductList } from './pages/products/product-list';
import { Sales } from './pages/sales/sales';
import { DashboardHome } from './pages/dashboard/dashboard-home';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    component: Login,
    canActivate: [loginGuard]
  },
  { 
    path: 'dashboard', 
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: DashboardHome },
      { path: 'products', component: ProductList },
      { path: 'sales', component: Sales },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
