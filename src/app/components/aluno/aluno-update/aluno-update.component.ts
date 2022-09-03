import { TurmaService } from 'src/app/services/turma.service';
import { Turma } from 'src/app/models/turma';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-aluno-update',
  templateUrl: './aluno-update.component.html',
  styleUrls: ['./aluno-update.component.css']
})
export class AlunoUpdateComponent implements  OnInit {

  aluno: Aluno = {
    id: '',
    nome: '',
    turma: '',
    salaTurma: ''
  }

  nome = new FormControl(null, [Validators.minLength(5)])
  nascimento = new FormControl(null, [Validators.minLength(5)])
  sexo = new FormControl(null, [Validators.required])
  rg = new FormControl(null, [Validators.minLength(10)])
  responsavel = new FormControl(null, [Validators.minLength(5)])
  telefone = new FormControl(null, [Validators.minLength(11)])
  endereco = new FormControl(null, [Validators.required])
  zona = new FormControl(null, [Validators.required])
  cpf = new FormControl(null, [Validators.required])  
  turma = new FormControl(null, [Validators.required])

  turmas: Turma[] = [];

  constructor(
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private service: AlunoService,
    private turmaService: TurmaService) { }

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
  
  update(): void {
    this.service.update(this.aluno).subscribe(() => {
      this.toast.success('Aluno atualizado com sucesso!');
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
  
  cancel(): void {
    this.router.navigate(['alunos'])
  }

  validaCampos() {
    return this.nome.valid && this.cpf.valid 
    && this.nascimento.valid && this.sexo.valid 
    && this.rg.valid && this.responsavel.valid 
    && this.telefone.valid && this.endereco.valid 
    && this.zona.valid && this.turma.valid 
  }

  }