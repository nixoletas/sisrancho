import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArranchamentoService {
  private apiUrl = 'http://localhost:3001';
  
  constructor(private http: HttpClient, private authService: AuthService) { }
  
  getArranchamentos(cpf: string): Observable<any> {
    const token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get(`${this.apiUrl}/arranchamentos/${cpf}`, { headers });
  }

  addArranchamento(cpf: string, dataArranchamento: string): Observable<any> {
    const token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(`${this.apiUrl}/arranchamentos`, { cpf, dataArranchamento }, { headers });
  }

  cancelArranchamento(cpf: string, dataArranchamento: string): Observable<any> {
    const token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.put(`${this.apiUrl}/arranchamentos/cancel`, { cpf, dataArranchamento }, { headers });
  }
}
