import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SerieNivelSubnivel } from 'src/app/models/serieNivelSubnivel';
import { Turma } from 'src/app/models/turma';
import { SerieNivelSubnivelService } from 'src/app/services/serieNivelSubnivel.service ';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-enturma-alunos',
  templateUrl: './enturma-alunos.component.html',
  styleUrls: ['./enturma-alunos.component.css']
})
export class EnturmaAlunosComponent implements AfterViewInit {

  turma: Turma[] = [];

  turmas: Turma = {
    anoLetivo: '',
    sala: '',
    serieNivelSubnivel: '',
    nomeSerieNivelSubnivel: ''
  }

  series: SerieNivelSubnivel[] = [];

  displayedColumns: string[] = ['id', 'anoLetivo', 'sala', 'nomeSerieNivelSubnivel', 'action' ];
  dataSource = new MatTableDataSource<Turma>(this.turma);
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
   
  constructor(
    private serieService: SerieNivelSubnivelService,
    private service: TurmaService,
    private toast: ToastrService,   
    private router: Router) {}
 
  
  ngAfterViewInit() {
          this.findAll();
          this.listarSerie();
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

  listarSerie(): void {
    this.serieService.findAll().subscribe(resposta => {
      this.series = resposta;
    })
  }

}

