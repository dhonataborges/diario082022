import { AlunoAtividade } from './../models/alunoAtividade';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AlunoAtividadeService {

  constructor(private http: HttpClient,
    private snack: MatSnackBar) { }

findById(id: any): Observable<AlunoAtividade> {
return this.http.get<AlunoAtividade>(`${API_CONFIG.baseUrl}/alunoAtividades/${id}`);
}

findAll(): Observable<AlunoAtividade[]> {
return this.http.get<AlunoAtividade[]>(`${API_CONFIG.baseUrl}/alunoAtividades`);
}

create(alunoAtividade: AlunoAtividade): Observable<AlunoAtividade> {
return this.http.post<AlunoAtividade>(`${API_CONFIG.baseUrl}/alunoAtividades`, alunoAtividade);
}

update(alunoAtividade: AlunoAtividade): Observable<AlunoAtividade> {
return this.http.put<AlunoAtividade>(`${API_CONFIG.baseUrl}/alunoAtividades/${alunoAtividade.id}`, alunoAtividade);
}

delete(id: any): Observable<AlunoAtividade> {
return this.http.delete<AlunoAtividade>(`${API_CONFIG.baseUrl}/alunoAtividades/${id}`);
}

message(msg: String): void {
this.snack.open(`${msg}`, 'OK', {
horizontalPosition: 'end',
verticalPosition: 'top',
duration: 4000
})
}
}