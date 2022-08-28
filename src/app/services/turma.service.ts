import { Turma } from '../models/turma';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http : HttpClient,
    private snack : MatSnackBar ) {}

    findAll():Observable<Turma[]> {
      const url = this.baseUrl + "/turmas"
      return this.http.get<Turma[]>(url);
    }

    /** MÉTODO DE BUSCAR UM Turma PELO ID. ELE PREENCHE OS CAMPOS DO FORMULARIO PARAARIO NÃO 
   * PRECISAR DIGITAR NA HORA DE ATUALIZAR OS DADOS DO CLIENTE*/
  findById(id: any): Observable<Turma> {
    const url = this.baseUrl + "/turmas/" + id;
    return this.http.get<Turma>(url);
  }

   /** MÉTODO PARA CRIAR UM NOVO CLIENTE*/
   create(turmas: Turma): Observable<Turma> {
    const url = this.baseUrl + "/turmas";
    return this.http.post<Turma>(url, turmas);
  }

  /** MÉTODO DE ATUALIZAR CLIENTE */
  update(turmas: Turma): Observable<Turma> {
    const url = this.baseUrl + "/turmas/" + turmas.id;
    return this.http.put<Turma>(url, turmas);
  }

   /** MÉTODO DE DELETAR CLIENTE */
   delete(id : any):Observable<void> {
    const url = this.baseUrl + "/turmas/" + id;
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