import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description?: string;
  category_id: number;
  category: Category; // Relación anidada
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = '/api';

  /**
   * Obtiene los productos y transforma la respuesta
   * de { data: [...] } a Product[]
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<{ data: Product[] }>(`${this.apiUrl}/products`).pipe(
      map(res => res.data) // Transformación solicitada
    );
  }

  saveSale(saleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sales`, saleData);
  }

  getSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/summary`);
  }

  getTopClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reports/top-clients`);
  }

  getLowStock(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/inventory/low-stock`);
  }
}
