import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales.html',
})
export class Sales implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  cart = signal<CartItem[]>([]);
  isLoading = signal(false);
  isSaving = signal(false);
  
  // Datos del formulario de venta alineados con Laravel
  saleForm = {
    client_id: 1, // Por ahora valor por defecto
    payment_method_id: 1, // 1: Efectivo, etc.
    sale_status_id: 1, // 1: Completada
    description: '',
    tax_amount: 0,
    discount_amount: 0
  };

  searchTerm = signal('');
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  
  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const allProducts = this.products();
    return Array.isArray(allProducts) 
      ? allProducts.filter(p => p.name.toLowerCase().includes(term) || p.id.toString().includes(term))
      : [];
  });

  subtotal = computed(() => {
    return this.cart().reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  });

  total_amount = computed(() => {
    return this.subtotal() + this.saleForm.tax_amount - this.saleForm.discount_amount;
  });

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading.set(true);
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        const productsList = Array.isArray(data) ? data : (data.data || []);
        this.products.set(productsList);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  addToCart(product: Product) {
    if (product.stock <= 0) return;

    this.cart.update(current => {
      const existing = current.find(item => item.product.id === product.id);
      if (existing) {
        return current.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: number) {
    this.cart.update(current => current.filter(item => item.product.id !== productId));
  }

  confirmSale() {
    if (this.cart().length === 0) return;

    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;

    this.isSaving.set(true);
    const saleData = {
      user_id: user?.id || 1,
      client_id: this.saleForm.client_id,
      payment_method_id: this.saleForm.payment_method_id,
      sale_status_id: this.saleForm.sale_status_id,
      description: this.saleForm.description,
      subtotal: this.subtotal(),
      tax_amount: this.saleForm.tax_amount,
      discount_amount: this.saleForm.discount_amount,
      total_amount: this.total_amount(),
      // Incluimos los items para que el backend pueda procesar el detalle
      items: this.cart().map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }))
    };

    this.productService.saveSale(saleData).subscribe({
      next: () => {
        this.successMessage.set('Venta realizada con éxito');
        this.errorMessage.set(null);
        this.cart.set([]);
        this.saleForm.description = '';
        this.loadProducts();
        this.isSaving.set(false);
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => this.successMessage.set(null), 3000);
      },
      error: (err) => {
        console.error('Error saving sale:', err);
        this.errorMessage.set('Error al procesar la venta. Revisa los campos obligatorios.');
        this.successMessage.set(null);
        this.isSaving.set(false);
      }
    });
  }
}
