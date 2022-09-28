import { API_CONFIG } from './../config/api.config';
import { Turma } from '../models/turma';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfessorTurmaDisciplina } from '../models/professorTurmaDisciplina';

@Injectable({
  providedIn: 'root'
})
export class professorTurmaDisciplinaService {

  constructor(private http : HttpClient,
    private snack : MatSnackBar ) {}

    findById(id: any): Observable<ProfessorTurmaDisciplina> {
      return this.http.get<ProfessorTurmaDisciplina>(`${API_CONFIG.baseUrl}/professorTurmaDisciplina/${id}`);
      }
      
      findAll(): Observable<ProfessorTurmaDisciplina[]> {
      return this.http.get<ProfessorTurmaDisciplina[]>(`${API_CONFIG.baseUrl}/professorTurmaDisciplina`);
      }
      
      create(professorTurmaDisciplina: ProfessorTurmaDisciplina): Observable<ProfessorTurmaDisciplina> {
      return this.http.post<ProfessorTurmaDisciplina>(`${API_CONFIG.baseUrl}/professorTurmaDisciplina`, professorTurmaDisciplina);
      }
      
      update(professorTurmaDisciplina: ProfessorTurmaDisciplina): Observable<ProfessorTurmaDisciplina> {
      return this.http.put<ProfessorTurmaDisciplina>(`${API_CONFIG.baseUrl}/professorTurmaDisciplina/${professorTurmaDisciplina.id}`, professorTurmaDisciplina);
      }
      
      delete(id: any): Observable<ProfessorTurmaDisciplina> {
      return this.http.delete<ProfessorTurmaDisciplina>(`${API_CONFIG.baseUrl}/professorTurmaDisciplina/${id}`);
      }
      
      message(msg: String): void {
      this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
      })
      }
      }