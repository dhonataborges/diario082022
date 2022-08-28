import { AlunoAtividadeService } from './../../../../services/alunoAtividade.service';
import { MatPaginator } from '@angular/material/paginator';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlunoAtividade } from 'src/app/models/alunoAtividade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nota-read',
  templateUrl: './nota-read.component.html',
  styleUrls: ['./nota-read.component.css']
})
export class NotaReadComponent implements AfterViewInit {

  ativiades: AlunoAtividade[] = [];

  displayedColumns: string[] = ['id', 'nota', 'nomeAluno', 'nomeAtividadeTipo', 'action'];
  dataSource = new MatTableDataSource<AlunoAtividade>(this.ativiades);
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
   
  constructor(
    private service : AlunoAtividadeService,
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
      this.dataSource = new MatTableDataSource<AlunoAtividade>(this.ativiades);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void {
    this.router.navigate(['notaRegistrar/create'])
  }

}
