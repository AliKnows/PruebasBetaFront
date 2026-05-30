import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-home.html',
})
export class DashboardHome implements OnInit {
  private productService = inject(ProductService);

  summary = signal<any>(null);
  topClients = signal<any[]>([]);
  lowStock = signal<Product[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading.set(true);
    this.error.set(null);

    // Cargamos los 3 endpoints en paralelo
    const summary$ = this.productService.getSummary();
    const clients$ = this.productService.getTopClients();
    const lowStock$ = this.productService.getLowStock();

    // Nota: Usamos una aproximación simple. En producción se podría usar forkJoin.
    summary$.subscribe({
      next: (data: any) => this.summary.set(data?.data || data),
      error: (err) => console.error('Error summary:', err)
    });

    clients$.subscribe({
      next: (data: any) => {
        const list = Array.isArray(data) ? data : (data.data || []);
        this.topClients.set(list);
      },
      error: (err) => console.error('Error clients:', err)
    });

    lowStock$.subscribe({
      next: (data: any) => {
        const list = Array.isArray(data) ? data : (data.data || []);
        this.lowStock.set(list);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error low stock:', err);
        this.error.set('Error al cargar algunos datos del dashboard.');
        this.isLoading.set(false);
      }
    });
  }
}
