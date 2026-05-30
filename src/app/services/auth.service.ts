import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  message: string;
  access_token: string;
  token_type: string;
  user: {
    id: number;
    name: string;
    email: string;
    [key: string]: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  // Usamos una ruta relativa para que el proxy de Angular lo maneje
  private apiUrl = '/api';

  login(credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
