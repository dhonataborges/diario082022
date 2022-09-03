import { Professor } from './../../../models/professor';
import { Disciplina } from 'src/app/models/disciplina';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProfessorService } from 'src/app/services/professor.service';
import { ToastrService } from 'ngx-toastr';
import { Cargo } from 'src/app/models/cargo';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { CargoService } from 'src/app/services/cargo.service';
import { TurmaService } from 'src/app/services/turma.service';
import { Turma } from 'src/app/models/turma';

@Component({
  selector: 'app-professor-create',
  templateUrl: './professor-create.component.html',
  styleUrls: ['./professor-create.component.css']
})
export class ProfessorCreateComponent implements OnInit {
  
   prof: Professor = {
    id: '',
    nome: '',
    nascimento: '',
    sexo: '',
    cpf: '',
    rg: '',
    telefone: '',
    endereco: '',
    zona: '',
    email: '',
    senha: '',
    perfis: []
  }

  nome = new FormControl('', [Validators.minLength(5)])
  nascimento = new FormControl('', [Validators.minLength(5)])
  sexo = new FormControl('', [Validators.minLength(5)])
  rg = new FormControl('', [Validators.minLength(10)])
  telefone = new FormControl('', [Validators.minLength(11)])
  endereco = new FormControl('', [Validators.maxLength(50)])
  zona = new FormControl('', [Validators.minLength(5)])
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

    constructor(
    private toast: ToastrService,
    private router: Router,
    private service: ProfessorService,
    private serviceDiscip: DisciplinaService,
    private serviceCargo: CargoService,
    private serviceTurma: TurmaService){}
    
  ngOnInit(): void {
  }
  
  cancel(): void {
    this.router.navigate(['professores'])
  }
  
  create(): void {
    this.service.create(this.prof).subscribe(() => {
      this.toast.success('Professor cadastrado com sucesso!');
      this.router.navigate(['professores']);
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach((element: { message: string | undefined; }) => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    });
  }

  addPerfil(perfil: any): void {
    if(this.prof.perfis.includes(perfil)) {
      this.prof.perfis.splice(this.prof.perfis.indexOf(perfil), 1);
    } else {
      this.prof.perfis.push(perfil);
    }
  }

  validaCampos() {
    return this.nome.valid && this.cpf.valid 
      && this.email.valid && this.senha.valid
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

  errorValidZona() {
    if (this.zona.invalid) {
      return 'Estado é obrigatório!';
    }
    return false;
  }
}
