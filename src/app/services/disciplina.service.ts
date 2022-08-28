import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Disciplina } from '../models/disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http : HttpClient,
    private snack : MatSnackBar ) {}

    findAll():Observable<Disciplina[]> {
      const url = this.baseUrl + "/disciplinas"
      return this.http.get<Disciplina[]>(url);
    }

    /** MÉTODO DE BUSCAR UM Disciplina PELO ID. ELE PREENCHE OS CAMPOS DO FORMULARIO PARAARIO NÃO 
   * PRECISAR DIGITAR NA HORA DE ATUALIZAR OS DADOS DO CLIENTE*/
  findById(id: any): Observable<Disciplina> {
    const url = this.baseUrl + "/disciplinas/" + id;
    return this.http.get<Disciplina>(url);
  }

   /** MÉTODO PARA CRIAR UM NOVO CLIENTE*/
   create(disciplinas: Disciplina): Observable<Disciplina> {
    const url = this.baseUrl + "/disciplinas";
    return this.http.post<Disciplina>(url, disciplinas);
  }

  /** MÉTODO DE ATUALIZAR CLIENTE */
  update(disciplinas: Disciplina): Observable<Disciplina> {
    const url = this.baseUrl + "/disciplinas/" + disciplinas.id;
    return this.http.put<Disciplina>(url, disciplinas);
  }

   /** MÉTODO DE DELETAR CLIENTE */
   delete(id : any):Observable<void> {
    const url = this.baseUrl + "/disciplinas/" + id;
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