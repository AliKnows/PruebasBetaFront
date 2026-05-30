import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);
  
  products = signal<Product[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading.set(true);
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        // Manejamos si el backend devuelve un array directo o un objeto con propiedad 'data'
        const productsList = Array.isArray(data) ? data : (data.data || []);
        this.products.set(productsList);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.error.set('No se pudieron cargar los productos. Revisa la conexión con el backend.');
        this.isLoading.set(false);
      }
    });
  }
}
