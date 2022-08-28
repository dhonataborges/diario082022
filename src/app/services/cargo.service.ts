import { Cargo } from '../models/cargo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http : HttpClient,
    private snack : MatSnackBar ) {}

    findAll():Observable<Cargo[]> {
      const url = this.baseUrl + "/cargos"
      return this.http.get<Cargo[]>(url);
    }

    /** MÉTODO DE BUSCAR UM Cargo PELO ID. ELE PREENCHE OS CAMPOS DO FORMULARIO PARAARIO NÃO 
   * PRECISAR DIGITAR NA HORA DE ATUALIZAR OS DADOS DO CLIENTE*/
  findById(id: any): Observable<Cargo> {
    const url = this.baseUrl + "/cargos/" + id;
    return this.http.get<Cargo>(url);
  }

   /** MÉTODO PARA CRIAR UM NOVO CLIENTE*/
   create(cargos: Cargo): Observable<Cargo> {
    const url = this.baseUrl + "/cargos";
    return this.http.post<Cargo>(url, cargos);
  }

  /** MÉTODO DE ATUALIZAR CLIENTE */
  update(cargos: Cargo): Observable<Cargo> {
    const url = this.baseUrl + "/cargos/" + cargos.id;
    return this.http.put<Cargo>(url, cargos);
  }

   /** MÉTODO DE DELETAR CLIENTE */
   delete(id : any):Observable<void> {
    const url = this.baseUrl + "/cargos/" + id;
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