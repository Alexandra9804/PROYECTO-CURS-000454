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
