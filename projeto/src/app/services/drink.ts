import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  buscarPorNome(nome: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search.php?s=${nome}`);
  }
}