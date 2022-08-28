import { environment } from 'src/environments/environment';
import { SerieNivelSubnivel } from './../models/serieNivelSubnivel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class SerieNivelSubnivelService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<SerieNivelSubnivel> {
    return this.http.get<SerieNivelSubnivel>(`${API_CONFIG.baseUrl}/series/${id}`);
  }

  findAll(): Observable<SerieNivelSubnivel[]> {
    return this.http.get<SerieNivelSubnivel[]>(`${API_CONFIG.baseUrl}/series`);
  }

  create(prof: SerieNivelSubnivel): Observable<SerieNivelSubnivel> {
    return this.http.post<SerieNivelSubnivel>(`${API_CONFIG.baseUrl}/series`, prof);
  }

  update(prof: SerieNivelSubnivel): Observable<SerieNivelSubnivel> {
    return this.http.put<SerieNivelSubnivel>(`${API_CONFIG.baseUrl}/series/${prof.id}`, prof);
  }

  delete(id: any): Observable<SerieNivelSubnivel> {
    return this.http.delete<SerieNivelSubnivel>(`${API_CONFIG.baseUrl}/series/${id}`);
  }
}