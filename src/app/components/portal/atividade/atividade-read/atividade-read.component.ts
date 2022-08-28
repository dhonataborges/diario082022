import { formatDate } from '@angular/common';
import { Atividade } from './../../../../models/atividade';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AtividadeService } from 'src/app/services/atividade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atividade-read',
  templateUrl: './atividade-read.component.html',
  styleUrls: ['./atividade-read.component.css']
})
export class AtividadeReadComponent implements AfterViewInit {

  formatDate(date: Date): String {
    const d = new Date(date);
    return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
  }
  ativiades: Atividade[] = [];

  displayedColumns: string[] = ['id', 'dataCriacao', 'dataEntrega', 'notaMaxima', 'descricao', 'tipo', 'nomeDisciplina', 'action'];
  dataSource = new MatTableDataSource<Atividade>(this.ativiades);
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
   
  constructor(
    private service : AtividadeService,
    private router : Router) {}
  
  ngAfterViewInit() {
          this.findAll();
  }

  navigateTurmaAlunos():void {
    this.router.navigate(['turmaAlunos'])
  }

  findAll():void {
    this.service.findAll().subscribe((resposta) => {
      this.ativiades = resposta;
      this.dataSource = new MatTableDataSource<Atividade>(this.ativiades);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void {
    this.router.navigate(['atividadeRegistrar/create'])
  }

}
