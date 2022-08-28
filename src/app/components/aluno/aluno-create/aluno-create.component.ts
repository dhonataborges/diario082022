import { TurmaService } from 'src/app/services/turma.service';
import { Turma } from 'src/app/models/turma';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-aluno-create',
  templateUrl: './aluno-create.component.html',
  styleUrls: ['./aluno-create.component.css']
})
export class AlunoCreateComponent implements OnInit {

  aluno: Aluno = {
    id: '',
    nome: '',
    turma: '',
    salaTurma: ''
  }

  turmas: Turma[] = [];

  nome = new FormControl('', [Validators.minLength(5)])
  nascimento = new FormControl('', [Validators.minLength(5)])
  sexo = new FormControl('', [Validators.minLength(5)])
  rg = new FormControl('', [Validators.minLength(10)])
  responsavel = new FormControl('', [Validators.minLength(5)])
  telefone = new FormControl('', [Validators.minLength(11)])
  endereco = new FormControl('', [Validators.minLength(5)])
  zona = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  turma = new FormControl('', [Validators.minLength(4)])
  constructor(
    private toast: ToastrService,
    private router: Router,
    private service: AlunoService,
    private turmaService: TurmaService) { }

  ngOnInit(): void {
    this.listarTurmas();
  }

  cancel(): void {
    this.router.navigate(['alunos'])
  }

  create(): void {
    this.service.create(this.aluno).subscribe(() => {
      this.toast.success('Aluno cadastrado com sucesso!', 'Cadastro');
      this.router.navigate(['alunos']);
    }, err => {
      console.log(err)
      if (err.error.error.match('já cadastrado')) {
        this.toast.error(err.error.error)
      } else if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido") {
        this.toast.error("CPF inválido!")
        console.log(err)
      }
    })
  }

  listarTurmas(): void {
    this.turmaService.findAll().subscribe(resposta => {
      this.turmas = resposta;
    })
  }

  validaCampos() {
    return this.nome.valid && this.cpf.valid 
  }

  errorValidNome() {
    if (this.nome.invalid) {
      return 'O nome deve ter entre 5 e 100 caracteres!';
    }
    return false;
  }

  errorValidNascimento() {
    if (this.nascimento.invalid) {
      return 'Selecione a Data de Nascimento!';
    }
    return false;
  }

  errorValidSexo() {
    if (this.sexo.invalid) {
      return 'Selecione o genero do aluno!';
    }
    return false;
  }

  errorValidCPF() {
    if (this.cpf.invalid) {
      return 'O CPF deve entre 11 e 15 caracteres!';
    }
    return false;
  }

  errorValidRG(){
    if (this.rg.invalid) {
      return 'O RG é obrigatório!';
    }
    return false;
  }

  errorValidTelefone() {
    if (this.telefone.invalid) {
      return 'O Telefone deve ter entre 11 e 18 caracteres!';
    }
    return false;
  }

  errorValidEndereco() {
    if (this.endereco.invalid) {
      return 'Endereço é obrigatório!';
    }
    return false;
  }

  errorValidResponsavel() {
    if (this.responsavel.invalid) {
      return 'Responsavel é obrigatório!';
    }
    return false;
  }

}