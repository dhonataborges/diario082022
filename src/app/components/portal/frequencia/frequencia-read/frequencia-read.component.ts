import { ActivatedRoute, Router } from '@angular/router';
import { AlunoAula } from './../../../../models/alunoAula';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlunoAulaService } from 'src/app/services/alunoAula.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-frequencia-read',
  templateUrl: './frequencia-read.component.html',
  styleUrls: ['./frequencia-read.component.css']
})
export class FrequenciaReadComponent implements AfterViewInit {

  freq: AlunoAula = {
    id: '',
    frequencia: false,
    aula: '',
    conteudoAula: '',
    aluno: '',
    nomeAluno: ''
  }

  frequencia: AlunoAula[] = [];
  displayedColumns: string[] = ['id', 'nomeAluno', 'frequencia'];
  dataSource = new MatTableDataSource<AlunoAula>(this.frequencia);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  CheckBox(event: any) {
    event.currentTarget.checked
  }

  constructor(
    private toast: ToastrService,
    private service: AlunoAulaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngAfterViewInit() {
    this.freq.id = this.route.snapshot.paramMap.get('id');
    this.findAll();
  }

  navigateTurmaAlunos(): void {
    this.router.navigate(['turmaAlunos'])
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.frequencia = resposta;
      this.dataSource = new MatTableDataSource<AlunoAula>(this.frequencia);
      this.dataSource.paginator = this.paginator;
    })
  }

  create(): void {
    this.service.create(this.freq).subscribe(() => {
      this.toast.success('Aula registrada com sucesso!', 'Registrado');
      this.router.navigate(['turmaAlunos']);
    })
  }

  navigateToCreate(): void {
    this.router.navigate(['frequencia/create'])
  }

  navigateToUpdate(): void {
    this.router.navigate(['frequencia/update/:id'])
  }

}
