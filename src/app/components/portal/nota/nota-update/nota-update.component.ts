import { AtividadeService } from 'src/app/services/atividade.service';
import { AlunoService } from 'src/app/services/aluno.service';
import { AlunoAtividadeService } from './../../../../services/alunoAtividade.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { AlunoAtividade } from 'src/app/models/alunoAtividade';
import { Atividade } from 'src/app/models/atividade';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nota-update',
  templateUrl: './nota-update.component.html',
  styleUrls: ['./nota-update.component.css']
})
export class NotaUpdateComponent implements OnInit {

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
    private route: ActivatedRoute,
    private alunoService: AlunoService,
    private atividadeService: AtividadeService
    ) { }

  ngOnInit(): void {
    this.alunoAtividade.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.listarAluno();
    this.listarAtividade();
  }

  
  cancel(): void {
    this.router.navigate(['notas'])
  } 
  
  findById(): void {
    this.service.findById(this.alunoAtividade.id).subscribe(resposta => {
      this.alunoAtividade = resposta;
    }, ex => {
      this.toast.error(ex.error.error);
    });
  }

  update(): void {
    this.service.update(this.alunoAtividade).subscribe(() => {
      this.toast.success('Atividade atualizada com sucesso!', 'Atualizar Atividade');
      this.router.navigate(['notas']);
    }, ex => {
      this.toast.error(ex.error.error);
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