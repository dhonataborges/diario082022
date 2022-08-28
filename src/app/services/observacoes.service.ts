import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observacoes } from '../models/observacoes';

@Injectable({
  providedIn: 'root'
})
export class ObservacoesService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http : HttpClient,
    private snack : MatSnackBar ) {}

    findAll():Observable<Observacoes[]> {
      const url = this.baseUrl + "/observacoes"
      return this.http.get<Observacoes[]>(url);
    }

    /** MÉTODO DE BUSCAR UM Aluno PELO ID. ELE PREENCHE OS CAMPOS DO FORMULARIO PARAARIO NÃO 
   * PRECISAR DIGITAR NA HORA DE ATUALIZAR OS DADOS DO CLIENTE*/
  findById(id: any): Observable<Observacoes> {
    const url = this.baseUrl + "/observacoes/" + id;
    return this.http.get<Observacoes>(url);
  }

   /** MÉTODO PARA CRIAR UM NOVO CLIENTE*/
   create(observacoes: Observacoes): Observable<Observacoes> {
    const url = this.baseUrl + "/observacoes";
    return this.http.post<Observacoes>(url, observacoes);
  }

  /** MÉTODO DE ATUALIZAR CLIENTE */
  update(observacoes: Observacoes): Observable<Observacoes> {
    const url = this.baseUrl + "/observacoes/" + observacoes.id;
    return this.http.put<Observacoes>(url, observacoes);
  }

   /** MÉTODO DE DELETAR CLIENTE */
   delete(id : any):Observable<void> {
    const url = this.baseUrl + "/observacoes/" + id;
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