import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { PageResponse } from '../../../../shared/models/page-response.model';
import { VehicleModel } from '../model/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.API_BASE}/api/v1/vehiculos`;

  save(model: VehicleModel): Observable<VehicleModel> {
    return this.http.post<VehicleModel>(this.baseUrl, model);
  }

  update(id?: string, model?: VehicleModel): Observable<VehicleModel> {
    return this.http.put<VehicleModel>(`${this.baseUrl}/${id}`, model);
  }

  findById(id?: string): Observable<VehicleModel> {
    return this.http.get<VehicleModel>(`${this.baseUrl}/${id}`);
  }

  list(
    vin: string | null,
    idMarca: number | null,
    idModelo: number | null,
    page: number,
    size: number
  ): Observable<PageResponse<VehicleModel>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (vin !== null && vin.trim() !== '') {
      params = params.set('vin', vin);
    }

    if (idMarca !== null) {
      params = params.set('idMarca', idMarca);
    }

    if (idModelo !== null) {
      params = params.set('idModelo', idModelo);
    }

    return this.http.get<PageResponse<VehicleModel>>(`${this.baseUrl}/search`, { params });
  }

    delete(id?: string): Observable<VehicleModel> {
      return this.http.delete<VehicleModel>(`${this.baseUrl}/${id}`);
    }
}
