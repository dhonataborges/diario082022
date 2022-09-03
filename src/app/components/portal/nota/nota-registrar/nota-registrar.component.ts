import { AtividadeService } from 'src/app/services/atividade.service';
import { AlunoAtividadeService } from './../../../../services/alunoAtividade.service';
import { Atividade } from 'src/app/models/atividade';
import { AlunoAtividade } from 'src/app/models/alunoAtividade';
import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/models/aluno';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-nota-registrar',
  templateUrl: './nota-registrar.component.html',
  styleUrls: ['./nota-registrar.component.css']
})
export class NotaRegistrarComponent implements OnInit {

  alunoAtividade: AlunoAtividade = {
    id: '',
    nota: '',
    aluno:'',
    nomeAluno: '',
    atividade: '',
    nomeAtividadeTipo: ''
  }

  alunos: Aluno[] = [];
  atividades: Atividade[] = [];
  
  constructor(
    private toast: ToastrService,
    private router: Router,
    private service: AlunoAtividadeService,
    private alunoService: AlunoService,
    private atividadeService: AtividadeService
    ) { }

  ngOnInit(): void {
    this.listarAluno();
    this.listarAtividade();
  }

  cancel(): void {
    this.router.navigate(['notas'])
  }

  create(): void {
    this.service.create(this.alunoAtividade).subscribe(() => {
      this.toast.success('Nota registrada com sucesso!');
      this.router.navigate(['notas']);
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

  listarAtividade(): void {
    this.atividadeService.findAll().subscribe(resposta => {
      this.atividades = resposta;
    })
  }

}