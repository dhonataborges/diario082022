import { Professor } from './../../../models/professor';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-professor-updade',
  templateUrl: './professor-updade.component.html',
  styleUrls: ['./professor-updade.component.css']
})
export class ProfessorUpdadeComponent implements  OnInit {
  
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
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.prof.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  cancel(): void {
    this.router.navigate(['professores'])
  }

  
  update(): void {
    this.service.update(this.prof).subscribe(() => {
      this.toast.success('Professor atualizado com sucesso!');
      this.router.navigate(['professores']);
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

  addPerfil(perfil: any): void {
    if(this.prof.perfis.includes(perfil)) {
      this.prof.perfis.splice(this.prof.perfis.indexOf(perfil), 2);
    } else {
      this.prof.perfis.push(perfil);
    }
  }

  findById(): void {
    this.service.findById(this.prof.id).subscribe(resposta => {
      resposta.perfis = [];
      this.prof = resposta;
    })
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

  errorValidEmail() {
    if (this.email.invalid) {
      return 'E-mail é obrigatório!';
    }
    return false;
  }

  errorValidSenha(){
    if (this.senha.invalid) {
      return 'Senha é obrigatório!';
    }
    return false;
  }

  errorValidEndereco() {
    if (this.endereco.invalid) {
      return 'Endereço é obrigatório!';
    }
    return false;
  }

}
