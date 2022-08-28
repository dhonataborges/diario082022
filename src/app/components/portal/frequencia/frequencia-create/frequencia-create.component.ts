import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { AlunoAula } from 'src/app/models/alunoAula';
import { Aula } from 'src/app/models/aula';
import { AlunoService } from 'src/app/services/aluno.service';
import { AlunoAulaService } from 'src/app/services/alunoAula.service';
import { AulaService } from 'src/app/services/aula.servic';

@Component({
  selector: 'app-frequencia-create',
  templateUrl: './frequencia-create.component.html',
  styleUrls: ['./frequencia-create.component.css']
})
export class FrequenciaCreateComponent implements OnInit {

  frequencia: AlunoAula = {
    id: '',
    frequencia: '',
    aula: '',
    conteudoAula: '',
    aluno: '',
    nomeAluno: ''
  }

  alunos: Aluno[] = [];
  aulas: Aula[] = [];
  
  constructor(
    private toast: ToastrService,
    private router: Router,
    private service: AlunoAulaService,
    private alunoService: AlunoService,
    private aulaService: AulaService
    ) { }

  ngOnInit(): void {
    this.listarAluno();
    this.listarAula();
  }

  cancel(): void {
    this.router.navigate(['frequencia'])
  }

  create(): void {
    this.service.create(this.frequencia).subscribe(() => {
      this.toast.success('Aluno adicionado com sucesso!', 'Registro');
      this.router.navigate(['frequencia']);
    }, err => {
      if (err.error.error.match('já cadastrado')) {
        this.toast.error(err.error.error)
      } 
    })
  }

  listarAluno(): void {
    this.alunoService.findAll().subscribe(resposta => {
      this.alunos = resposta;
    })
  }

  listarAula(): void {
    this.aulaService.findAll().subscribe(resposta => {
      this.aulas = resposta;
    })
  }

}