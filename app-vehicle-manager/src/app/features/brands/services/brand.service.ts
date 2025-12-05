import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandModel } from '../model/brand.model';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  url = `${environment.API_BASE}/api/v1/marcas`;

  private readonly httpClient = inject(HttpClient);

  list(): Observable<BrandModel[]> {
    return this.httpClient.get<BrandModel[]>(this.url);
  }

  buscar(nombre: string): Observable<BrandModel[]> {
    const url_local = `${this.url}?nombre_like=${nombre}`;
    return this.httpClient.get<BrandModel[]>(url_local);
  }

  findById(id?: string): Observable<BrandModel> {
    return this.httpClient.get<BrandModel>(`${this.url}/${id}`);
  }

  save(brand: BrandModel): Observable<BrandModel> {
    return this.httpClient.post<BrandModel>(this.url, brand);
  }

  update(id?: string, brand?: BrandModel): Observable<BrandModel> {
    return this.httpClient.put<BrandModel>(`${this.url}/${id}`, brand);
  }

  delete(id?: string): Observable<BrandModel> {
    return this.httpClient.delete<BrandModel>(`${this.url}/${id}`);
  }
}
