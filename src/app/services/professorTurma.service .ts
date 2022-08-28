import { ProfessorTurma } from './../models/professorTurma';
import { Turma } from '../models/turma';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessorTurmaService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http : HttpClient,
    private snack : MatSnackBar ) {}

    findAll():Observable<ProfessorTurma[]> {
      const url = this.baseUrl + "/professorTurmas"
      return this.http.get<ProfessorTurma[]>(url);
    }

    /** MÉTODO DE BUSCAR UM Turma PELO ID. ELE PREENCHE OS CAMPOS DO FORMULARIO PARAARIO NÃO 
   * PRECISAR DIGITAR NA HORA DE ATUALIZAR OS DADOS DO CLIENTE*/
  findById(id: any): Observable<ProfessorTurma> {
    const url = this.baseUrl + "/professorTurmas/" + id;
    return this.http.get<ProfessorTurma>(url);
  }

   /** MÉTODO PARA CRIAR UM NOVO CLIENTE*/
   create(professorTurmas: ProfessorTurma): Observable<ProfessorTurma> {
    const url = this.baseUrl + "/professorTurmas";
    return this.http.post<ProfessorTurma>(url, professorTurmas);
  }

  /** MÉTODO DE ATUALIZAR CLIENTE */
  update(professorTurmas: ProfessorTurma): Observable<ProfessorTurma> {
    const url = this.baseUrl + "/professorTurmas/" + professorTurmas.id;
    return this.http.put<ProfessorTurma>(url, professorTurmas);
  }

   /** MÉTODO DE DELETAR CLIENTE */
   delete(id : any):Observable<void> {
    const url = this.baseUrl + "/professorTurmas/" + id;
    return this.http.delete<void>(url);
  }


  message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })

}
}