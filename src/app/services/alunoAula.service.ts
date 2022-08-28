import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AlunoAula } from '../models/alunoAula';

@Injectable({
  providedIn: 'root'
})

export class AlunoAulaService {

  constructor(private http: HttpClient,
    private snack: MatSnackBar) { }

findById(id: any): Observable<AlunoAula> {
return this.http.get<AlunoAula>(`${API_CONFIG.baseUrl}/frequencia/${id}`);
}

findAll(): Observable<AlunoAula[]> {
return this.http.get<AlunoAula[]>(`${API_CONFIG.baseUrl}/frequencia`);
}

create(alunoAula: AlunoAula): Observable<AlunoAula> {
return this.http.post<AlunoAula>(`${API_CONFIG.baseUrl}/frequencia`, alunoAula);
}

update(alunoAula: AlunoAula): Observable<AlunoAula> {
return this.http.put<AlunoAula>(`${API_CONFIG.baseUrl}/frequencia/${alunoAula.id}`, alunoAula);
}

delete(id: any): Observable<AlunoAula> {
return this.http.delete<AlunoAula>(`${API_CONFIG.baseUrl}/frequencia/${id}`);
}

message(msg: String): void {
this.snack.open(`${msg}`, 'OK', {
horizontalPosition: 'end',
verticalPosition: 'top',
duration: 4000
})
}
}