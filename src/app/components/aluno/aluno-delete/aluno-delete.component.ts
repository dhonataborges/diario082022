import { TurmaService } from 'src/app/services/turma.service';
import { Turma } from 'src/app/models/turma';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-aluno-delete',
  templateUrl: './aluno-delete.component.html',
  styleUrls: ['./aluno-delete.component.css']
})
export class AlunoDeleteComponent implements OnInit {

  aluno: Aluno = {
    id: '',
    nome: '',
    turma: '',
    salaTurma: ''
  }

  turmas: Turma[] = [];

  constructor(
    private service: AlunoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private turmaService: TurmaService
  ) { }

  ngOnInit(): void {
    this.aluno.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.listarTurmas();
  }

  findById(): void {
    this.service.findById(this.aluno.id).subscribe(resposta => {
      this.aluno = resposta;
    }, ex => {
      this.toast.error(ex.error.error);
    });
  }

  listarTurmas(): void {
    this.turmaService.findAll().subscribe(resposta => {
      this.turmas = resposta;
    })
  }
  delete(): void {
    this.service.delete(this.aluno.id).subscribe(() => {
      this.toast.success('aluno deletato com sucesso!', 'Delete');
      this.router.navigate(['alunos']);
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['alunos'])
  }

}  