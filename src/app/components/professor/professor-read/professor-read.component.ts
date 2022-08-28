import { Professor } from './../../../models/professor';
import { ProfessorService } from './../../../services/professor.service';
import { Disciplina } from '../../../models/disciplina';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-read',
  templateUrl: './professor-read.component.html',
  styleUrls: ['./professor-read.component.css']
})
export class ProfessorReadComponent implements AfterViewInit {

profissionais: Professor[] = [];

  displayedColumns: string[] = ['id', 'nome', 'email', 'action'];
  dataSource = new MatTableDataSource<Professor>(this.profissionais);
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
   
  constructor(
    private service : ProfessorService,
    private router : Router,
    private disciplinaService: DisciplinaService) {}
  
  ngAfterViewInit() {
          this.findAll();
  }

  findAll():void {
    this.service.findAll().subscribe((resposta) => {
     // this.listarDisciplina();
      this.profissionais = resposta;
      this.dataSource = new MatTableDataSource<Professor>(this.profissionais);
      this.dataSource.paginator = this.paginator;

    })
  }

  navigateToCreate():void {
    this.router.navigate(['professores/create'])
  }

   /** O METODO listarCliente FAZ COM QUE APAREÇA O NOME DO CLIENTE NA COLUNA CLIENTE DA TABELA AO IVÉS DO ID. */
   /*listarDisciplina(): void {
    this.profissionais.forEach(x => {
      this.disciplinaService.findById(x.disciplinas).subscribe(resposta => {
        x.disciplinas = resposta.nomeDisciplina
      })
    }

    )
  }*/

}