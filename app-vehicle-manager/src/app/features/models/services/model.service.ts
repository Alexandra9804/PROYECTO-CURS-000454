import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PageResponse } from '../../../../shared/models/page-response.model';
import { ModelModel } from '../model/model.model';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.API_BASE}/api/v1/modelos`;

  save(model: ModelModel): Observable<ModelModel> {
    return this.http.post<ModelModel>(this.baseUrl, model);
  }

  update(id?: string, model?: ModelModel): Observable<ModelModel> {
    return this.http.put<ModelModel>(`${this.baseUrl}/${id}`, model);
  }

  findById(id?: string): Observable<ModelModel> {
    return this.http.get<ModelModel>(`${this.baseUrl}/${id}`);
  }

  delete(id?: string): Observable<ModelModel> {
    return this.http.delete<ModelModel>(`${this.baseUrl}/${id}`);
  }

  list(
    nombre: string | null,
    idMarca: number | null,
    page: number,
    size: number
  ): Observable<PageResponse<ModelModel>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (nombre !== null && nombre.trim() !== '') {
      params = params.set('nombre', nombre);
    }

    if (idMarca !== null) {
      params = params.set('idMarca', idMarca);
    }

    return this.http.get<PageResponse<ModelModel>>(`${this.baseUrl}/search`, { params });
  }
}
