import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private authService = inject(AuthService);
  private router = inject(Router);

  userName = signal<string>('Usuario');
  isSidebarOpen = signal(true);

  menuItems: Array<{ icon: string; label: string; path: string }> = [
    { icon: 'home', label: 'Inicio', path: 'home' },
    { icon: 'inventory', label: 'Productos', path: 'products' },
    { icon: 'shopping_cart', label: 'Ventas', path: 'sales' },
  ];

  constructor() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.userName.set(user.name);
    }
  }

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
