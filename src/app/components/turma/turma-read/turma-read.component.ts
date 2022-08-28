import { TurmaService } from './../../../services/turma.service';
import { Turma } from './../../../models/turma';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-turma-read',
  templateUrl: './turma-read.component.html',
  styleUrls: ['./turma-read.component.css']
})
export class TurmaReadComponent implements AfterViewInit {

  turma: Turma[] = [];

  displayedColumns: string[] = ['id', 'anoLetivo', 'sala', 'nomeSerieNivelSubnivel', 'action' ];
  dataSource = new MatTableDataSource<Turma>(this.turma);
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
   
  constructor(
    private service : TurmaService,
    private router : Router) {}
  
  ngAfterViewInit() {
          this.findAll();
  }

  findAll():void {
    this.service.findAll().subscribe((resposta) => {
      this.turma = resposta;
      this.dataSource = new MatTableDataSource<Turma>(this.turma);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void {
    this.router.navigate(['turmas/create'])
  }

}

