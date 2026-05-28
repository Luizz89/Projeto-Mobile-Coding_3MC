import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  buscarPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lookup.php?i=${id}`);
  }
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  buscarPorNome(nome: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search.php?s=${nome}`);
  }
  buscarPorIngrediente(ingrediente: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/filter.php?i=${ingrediente}`);
}

}
