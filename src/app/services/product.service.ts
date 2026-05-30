import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  descripcion?: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = '/api/products'; // El proxy redirige a http://localhost:8001/api/products

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  saveSale(saleData: any): Observable<any> {
    // Según la respuesta del usuario, el endpoint de ventas es POST /api/products
    // Nota: Es inusual, pero seguiremos la instrucción.
    return this.http.post(this.apiUrl, saleData);
  }
}
