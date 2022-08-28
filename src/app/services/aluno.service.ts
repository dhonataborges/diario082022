import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http: HttpClient,
            private snack: MatSnackBar) { }

  findById(id: any): Observable<Aluno> {
    return this.http.get<Aluno>(`${API_CONFIG.baseUrl}/alunos/${id}`);
  }

  findAll(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${API_CONFIG.baseUrl}/alunos`);
  }

  create(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(`${API_CONFIG.baseUrl}/alunos`, aluno);
  }

  update(aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${API_CONFIG.baseUrl}/alunos/${aluno.id}`, aluno);
  }

  delete(id: any): Observable<Aluno> {
    return this.http.delete<Aluno>(`${API_CONFIG.baseUrl}/alunos/${id}`);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}