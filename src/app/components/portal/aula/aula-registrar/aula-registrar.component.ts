import { ProfessorTurmaDisciplina } from './../../../../models/professorTurmaDisciplina';
import { Professor } from 'src/app/models/professor';
import { Aula } from './../../../../models/aula';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AulaService } from 'src/app/services/aula.servic';
import { ProfessorService } from 'src/app/services/professor.service';
import { professorTurmaDisciplinaService } from 'src/app/services/professorTurmaDisciplina.service';

@Component({
  selector: 'app-aula-registrar',
  templateUrl: './aula-registrar.component.html',
  styleUrls: ['./aula-registrar.component.css']
})
export class AulaRegistrarComponent implements OnInit {

  aulas: Aula = {
    id: '',
    data: '',
    horaInicio:'',
    horaFim: '',
    conteudo: '',
    disciplina: '',
    nomeDisciplina: ''
  }
 
  discs: ProfessorTurmaDisciplina[] = [];

  time = {hour: 13, minute: 30};
  horaInicio = `${new Date().getHours()}:${(new Date().getMinutes()<10?'0':'') + new Date().getMinutes()}`;
  data = new FormControl('', [Validators.minLength(5)])
  horaFim = new FormControl('', [Validators.minLength(5)])
  conteudo = new FormControl('', [Validators.minLength(10)])
  disciplina = new FormControl('', [Validators.minLength(5)])
  
  constructor(
    private toast: ToastrService,
    private router: Router,
    private service: AulaService,
    private profService: professorTurmaDisciplinaService) { }

  ngOnInit(): void {
    this.listarProf();
  }

  cancel(): void {
    this.router.navigate(['aulas'])
  }

  create(): void {
    this.service.create(this.aulas).subscribe(() => {
      this.toast.success('Aula registrada com sucesso!', 'Registrado');
      this.router.navigate(['aulas']);
    })
  }

  listarProf(): void {
    this.profService.findAll().subscribe(resposta => {
      this.discs = resposta;
    })
  }

}