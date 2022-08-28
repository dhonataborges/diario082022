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

  baseUrl: String = environment.baseUrl;

  constructor(
    private http : HttpClient,
    private snack : MatSnackBar ) {}

    findAll():Observable<ProfessorTurmaDisciplina[]> {
      const url = this.baseUrl + "/professorTurmaDisciplina"
      return this.http.get<ProfessorTurmaDisciplina[]>(url);
    }

    /** MÉTODO DE BUSCAR UM Turma PELO ID. ELE PREENCHE OS CAMPOS DO FORMULARIO PARAARIO NÃO 
   * PRECISAR DIGITAR NA HORA DE ATUALIZAR OS DADOS DO CLIENTE*/
    findById(id: any): Observable<ProfessorTurmaDisciplina> {
    const url = this.baseUrl + "/professorTurmaDisciplina/" + id;
    return this.http.get<ProfessorTurmaDisciplina>(url);
  }

   /** MÉTODO PARA CRIAR UM NOVO CLIENTE*/
   create(professorTurmaDisciplina: ProfessorTurmaDisciplina): Observable<ProfessorTurmaDisciplina> {
    const url = this.baseUrl + "/professorTurmaDisciplina";
    return this.http.post<ProfessorTurmaDisciplina>(url, professorTurmaDisciplina);
  }

  /** MÉTODO DE ATUALIZAR CLIENTE */
  update(professorTurmaDisciplina: ProfessorTurmaDisciplina): Observable<ProfessorTurmaDisciplina> {
    const url = this.baseUrl + "/professorTurmaDisciplina/" + professorTurmaDisciplina.id;
    return this.http.put<ProfessorTurmaDisciplina>(url, professorTurmaDisciplina);
  }

   /** MÉTODO DE DELETAR CLIENTE */
   delete(id : any):Observable<void> {
    const url = this.baseUrl + "/professorTurmaDisciplina/" + id;
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