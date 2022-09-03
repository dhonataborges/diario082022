import { AtividadeService } from 'src/app/services/atividade.service';
import { Atividade } from './../../../../models/atividade';
import { Component, OnInit } from '@angular/core';
import { ProfessorTurmaDisciplina } from 'src/app/models/professorTurmaDisciplina';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AulaService } from 'src/app/services/aula.servic';
import { professorTurmaDisciplinaService } from 'src/app/services/professorTurmaDisciplina.service';

@Component({
  selector: 'app-atividade-registrar',
  templateUrl: './atividade-registrar.component.html',
  styleUrls: ['./atividade-registrar.component.css']
})
export class AtividadeRegistrarComponent implements OnInit {

  atividades: Atividade = {
    id: '',
    dataCriacao: '',
    dataEntrega:'',
    notaMaxima: '',
    descricao: '',
    tipo: '',
    disciplina: '',
    nomeDisciplina: ''
  }
 
  discs: ProfessorTurmaDisciplina[] = [];
   
  constructor(
    private toast: ToastrService,
    private router: Router,
    private service: AtividadeService,
    private profService: professorTurmaDisciplinaService) { }

  ngOnInit(): void {
    this.listarProf();
  }

  cancel(): void {
    this.router.navigate(['atividades'])
  }

  create(): void {
    this.service.create(this.atividades).subscribe(() => {
      this.toast.success('Atividade registrada com sucesso!');
      this.router.navigate(['atividades']);
   })
  }

  listarProf(): void {
    this.profService.findAll().subscribe(resposta => {
      this.discs = resposta;
    })
  }

}