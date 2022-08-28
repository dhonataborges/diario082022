import { AulaService } from './../../../../services/aula.servic';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Aula } from 'src/app/models/aula';

@Component({
  selector: 'app-aula-read',
  templateUrl: './aula-read.component.html',
  styleUrls: ['./aula-read.component.css']
})
export class AulaReadComponent implements AfterViewInit {

  aulas: Aula[] = [];
  displayedColumns: string[] = ['id', 'data', 'horaInicio', 'horaFim', 'nomeDisciplina', 'conteudo', 'action'];
  dataSource = new MatTableDataSource<Aula>(this.aulas);
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  formatDate(date: Date): String {
    const d = new Date(date);
    return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
  }
  
  constructor(
    private service : AulaService,
    private router : Router) {}

  ngAfterViewInit() {
          this.findAll();
  }

  navigateTurmaAlunos():void {
    this.router.navigate(['turmaAlunos'])
  }

  findAll():void {
    this.service.findAll().subscribe((resposta) => {
      this.aulas = resposta;
      this.dataSource = new MatTableDataSource<Aula>(this.aulas);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void {
    this.router.navigate(['aulaRegistrar/create'])
  }

}
