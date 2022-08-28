import { professorTurmaDisciplinaService } from './../../../../services/professorTurmaDisciplina.service';
import { AulaService } from 'src/app/services/aula.servic';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { ProfessorTurmaDisciplina } from './../../../../models/professorTurmaDisciplina';
import { Component, OnInit } from '@angular/core';
import { Aula } from 'src/app/models/aula';

@Component({
  selector: 'app-aula-delete',
  templateUrl: './aula-delete.component.html',
  styleUrls: ['./aula-delete.component.css']
})
export class AulaDeleteComponent implements OnInit {

  aulas: Aula = {
    id: '',
    data: '',
    horaInicio: '',
    horaFim: '',
    conteudo: '',
    disciplina: '',
    nomeDisciplina: ''
  }

  discs: ProfessorTurmaDisciplina[] = [];
  time = { hour: 13, minute: 30 };
  horaInicio = `${new Date().getHours()}:${(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()}`;
  data = new FormControl('', [Validators.minLength(5)])
  horaFim = new FormControl('', [Validators.minLength(5)])
  conteudo = new FormControl('', [Validators.minLength(10)])
  professor = new FormControl('', [Validators.minLength(5)])

  constructor(
    private toast: ToastrService,
    private router: Router,
    private service: AulaService,
    private route: ActivatedRoute,
    private profService: professorTurmaDisciplinaService) { }

  ngOnInit(): void {
    this.aulas.id = this.route.snapshot.paramMap.get('id');
    this.listarProf();
    this.findById();
  }

  cancel(): void {
    this.router.navigate(['aulas'])
  }

  findById(): void {
    this.service.findById(this.aulas.id).subscribe(resposta => {
      this.aulas = resposta;
    }, ex => {
      this.toast.error(ex.error.error);
    });
  }

  delete(): void {
    this.service.delete(this.aulas.id).subscribe(() => {
      this.toast.error('Aulas deletato com sucesso!', 'Delete');
      this.router.navigate(['aulas']);
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

  listarProf(): void {
    this.profService.findAll().subscribe(resposta => {
      this.discs = resposta;
    })
  }

}