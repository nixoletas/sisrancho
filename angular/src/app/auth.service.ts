// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  private apiUrl = 'http://localhost:3001/login'; // URL do endpoint de login no Node.js

  constructor(private http: HttpClient) {}

  login(cpf: string, password: string): Observable<any> {
    const body = { cpf, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrl, body, { headers }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    
  }

  getUserCpf(): string | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT
      return payload.cpf || null; // Retorna o CPF do usuário
    }
    return null;
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

}
