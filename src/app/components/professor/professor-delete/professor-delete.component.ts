import { Professor } from './../../../models/professor';

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-professor-delete',
  templateUrl: './professor-delete.component.html',
  styleUrls: ['./professor-delete.component.css']
})
export class ProfessorDeleteComponent implements OnInit {
  
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
  
  constructor(
    private toast: ToastrService,
    private router: Router,
    private service: ProfessorService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.prof.id = this.route.snapshot.paramMap.get('id')!
    this.findById();
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
      console.log("response", resposta.nome) 
      resposta.perfis = [];
      this.prof.id = resposta.id;
      this.prof.nome = resposta.nome;
      this.prof.email = resposta.email;
      this.prof.senha = resposta.senha; 
      console.log("response", this.prof)
    })
  }  
  
  delete(): void {
    this.service.delete(this.prof.id).subscribe(() => {
      this.toast.error('Professor excluido com sucesso!');
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
  
  cancel(): void {
    this.router.navigate(['professores'])
  }

}