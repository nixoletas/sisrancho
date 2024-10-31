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
    const headers = new HttpHeaders({ 'Authorization': this.authService.authToken || '' });
    return this.http.get(`${this.apiUrl}/arranchamentos/${cpf}`, { headers });
  }

  addArranchamento(cpf: string, dataArranchamento: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('authToken') || '' });
    return this.http.post(`${this.apiUrl}/arranchamentos`, { cpf, dataArranchamento }, { headers });
  }

  cancelArranchamento(cpf: string, dataArranchamento: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('authToken') || '' });
    return this.http.put(`${this.apiUrl}/arranchamentos/cancel`, { cpf, dataArranchamento }, { headers });
  }
}
