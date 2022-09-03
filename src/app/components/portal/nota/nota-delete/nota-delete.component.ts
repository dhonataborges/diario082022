import { Atividade } from 'src/app/models/atividade';
import { AlunoAtividade } from 'src/app/models/alunoAtividade';
import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/models/aluno';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoAtividadeService } from 'src/app/services/alunoAtividade.service';
import { AlunoService } from 'src/app/services/aluno.service';
import { AtividadeService } from 'src/app/services/atividade.service';

@Component({
  selector: 'app-nota-delete',
  templateUrl: './nota-delete.component.html',
  styleUrls: ['./nota-delete.component.css']
})
export class NotaDeleteComponent implements OnInit {

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

  findById(): void {
    this.service.findById(this.alunoAtividade.id).subscribe(resposta => {
      this.alunoAtividade = resposta;
    }, ex => {
      this.toast.error(ex.error.error);
    });
  }

  cancel(): void {
    this.router.navigate(['notas'])
  }

  delete(): void {
    this.service.delete(this.alunoAtividade.id).subscribe(() => {
      this.toast.error('Nota excluida com sucesso!');
      this.router.navigate(['notas']);
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    });
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