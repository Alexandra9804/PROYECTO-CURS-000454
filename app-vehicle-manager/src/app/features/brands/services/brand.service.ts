import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandModel } from '../model/brand.model';
import { PageResponse } from '../../../../shared/models/page-response.model';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  url = `${environment.API_BASE}/api/v1/marcas`;

  private readonly httpClient = inject(HttpClient);
  
  listAll(): Observable<BrandModel[]> {
    return this.httpClient.get<BrandModel[]>(this.url);
  }

  list(nombre: string, page: number, size: number): Observable<PageResponse<BrandModel>> {
    let params = new HttpParams().set('nombre', nombre).set('page', page).set('size', size);

    return this.httpClient.get<PageResponse<BrandModel>>(`${this.url}/search`, { params });
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
