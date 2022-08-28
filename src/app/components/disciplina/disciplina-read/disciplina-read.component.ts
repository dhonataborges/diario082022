import { Router } from '@angular/router';
import { DisciplinaService } from './../../../services/disciplina.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Disciplina } from './../../../models/disciplina';
import { Component, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-disciplina-read',
  templateUrl: './disciplina-read.component.html',
  styleUrls: ['./disciplina-read.component.css']
})
export class DisciplinaReadComponent implements AfterViewInit {

  disciplina: Disciplina[] = [];

  displayedColumns: string[] = ['id', 'nome', 'ementa', 'nomeSerieNivelSubnivel', 'action' ];
  dataSource = new MatTableDataSource<Disciplina>(this.disciplina);
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
   
  constructor(
    private service : DisciplinaService,
    private router : Router) {}

  ngAfterViewInit() {
          this.findAll();
  }

  findAll():void {
    this.service.findAll().subscribe((resposta) => {
      this.disciplina = resposta;
      this.dataSource = new MatTableDataSource<Disciplina>(this.disciplina);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void {
    this.router.navigate(['disciplinas/create'])
  }

}

