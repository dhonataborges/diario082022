import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_CONFIG } from '../config/api.config';
import { Professor } from '../models/professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Professor> {
    return this.http.get<Professor>(`${API_CONFIG.baseUrl}/professores/${id}`);
  }

  findAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${API_CONFIG.baseUrl}/professores`);
  }

  create(prof: Professor): Observable<Professor> {
    return this.http.post<Professor>(`${API_CONFIG.baseUrl}/professores`, prof);
  }

  update(prof: Professor): Observable<Professor> {
    return this.http.put<Professor>(`${API_CONFIG.baseUrl}/professores/${prof.id}`, prof);
  }

  delete(id: any): Observable<Professor> {
    return this.http.delete<Professor>(`${API_CONFIG.baseUrl}/professores/${id}`);
  }
}