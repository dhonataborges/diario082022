import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aula } from '../models/aula';

@Injectable({
  providedIn: 'root'
})

export class AulaService {

  constructor(private http: HttpClient,
    private snack: MatSnackBar) { }

findById(id: any): Observable<Aula> {
return this.http.get<Aula>(`${API_CONFIG.baseUrl}/aulas/${id}`);
}

findAll(): Observable<Aula[]> {
return this.http.get<Aula[]>(`${API_CONFIG.baseUrl}/aulas`);
}

create(aula: Aula): Observable<Aula> {
return this.http.post<Aula>(`${API_CONFIG.baseUrl}/aulas`, aula);
}

update(aula: Aula): Observable<Aula> {
return this.http.put<Aula>(`${API_CONFIG.baseUrl}/aulas/${aula.id}`, aula);
}

delete(id: any): Observable<Aula> {
return this.http.delete<Aula>(`${API_CONFIG.baseUrl}/aulas/${id}`);
}

message(msg: String): void {
this.snack.open(`${msg}`, 'OK', {
horizontalPosition: 'end',
verticalPosition: 'top',
duration: 4000
})
}
}