import { AlunoService } from 'src/app/services/aluno.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Aluno } from 'src/app/models/aluno';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turma-list-alunos',
  templateUrl: './turma-list-alunos.component.html',
  styleUrls: ['./turma-list-alunos.component.css']
})
export class TurmaListAlunosComponent implements AfterViewInit {

  alunos: Aluno[] = [];

  displayedColumns: string[] = ['id', 'nome', 'action'];
  dataSource = new MatTableDataSource<Aluno>(this.alunos);
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
   
  constructor(
    private service : AlunoService,
    private router : Router) {}
  
  ngAfterViewInit() {
          this.findAll();
  }

  findAll():void {
    this.service.findAll().subscribe((resposta) => {
      this.alunos = resposta;
      this.dataSource = new MatTableDataSource<Aluno>(this.alunos);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigatePainelProfessor():void {
    this.router.navigate(['portalProfessor'])
  }

  navigateAula():void {
    this.router.navigate(['aulas'])
  }

  navigateAtividade():void {
    this.router.navigate(['atividades'])
  }

  navigateFrequencia():void {
    this.router.navigate(['frequencia'])
  }

  navigateNota():void {
    this.router.navigate(['notas'])
  }
}
