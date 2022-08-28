import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Atividade } from '../models/atividade';

@Injectable({
  providedIn: 'root'
})

export class AtividadeService {

  constructor(private http: HttpClient,
    private snack: MatSnackBar) { }

findById(id: any): Observable<Atividade> {
return this.http.get<Atividade>(`${API_CONFIG.baseUrl}/atividades/${id}`);
}

findAll(): Observable<Atividade[]> {
return this.http.get<Atividade[]>(`${API_CONFIG.baseUrl}/atividades`);
}

create(atividade: Atividade): Observable<Atividade> {
return this.http.post<Atividade>(`${API_CONFIG.baseUrl}/atividades`, atividade);
}

update(atividade: Atividade): Observable<Atividade> {
return this.http.put<Atividade>(`${API_CONFIG.baseUrl}/atividades/${atividade.id}`, atividade);
}

delete(id: any): Observable<Atividade> {
return this.http.delete<Atividade>(`${API_CONFIG.baseUrl}/atividades/${id}`);
}

message(msg: String): void {
this.snack.open(`${msg}`, 'OK', {
horizontalPosition: 'end',
verticalPosition: 'top',
duration: 4000
})
}
}