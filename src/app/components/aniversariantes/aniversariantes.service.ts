import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AniversariantesService {
  apiUrl = environment.NIVER_API;  // URL do seu Strapi

  constructor(private http: HttpClient) { }

  // Método para obter dados de uma coleção
  getCollection(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
