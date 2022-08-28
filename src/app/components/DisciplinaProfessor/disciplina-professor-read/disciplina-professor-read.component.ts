import { ProfessorTurmaDisciplina } from 'src/app/models/professorTurmaDisciplina';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { professorTurmaDisciplinaService } from 'src/app/services/professorTurmaDisciplina.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disciplina-professor-read',
  templateUrl: './disciplina-professor-read.component.html',
  styleUrls: ['./disciplina-professor-read.component.css']
})
export class DisciplinaProfessorReadComponent implements AfterViewInit {

  disciplinaProfessor: ProfessorTurmaDisciplina[] = [];

  displayedColumns: string[] = ['id', 'nomeProfessor', 'descricaoTurma', 'nomeDisciplina', 'bimestre', 'dataAtribuicao', 'anoLetivo', 'status','action' ];
  dataSource = new MatTableDataSource<ProfessorTurmaDisciplina>(this.disciplinaProfessor);
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
   
  constructor(
    private service : professorTurmaDisciplinaService,
    private router : Router) {}
  
  ngAfterViewInit() {
          this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(x => {
        if(x.status != "ENCERRADO") {
          this.disciplinaProfessor.push(x)
        }
      })

      this.dataSource = new MatTableDataSource<ProfessorTurmaDisciplina>(this.disciplinaProfessor);
      this.dataSource.paginator = this.paginator;
    })
  }
 
  /** ESSE METODO MUDA A COR DO STATUS */
  status(x: any) {
    if (x == 'ATIVO') {
      return 'ativo'
    } else{
      return 'inativo'
    }
  }

  navigateToCreate():void {
    this.router.navigate(['disciplinaProfessor/create'])
  }

}

