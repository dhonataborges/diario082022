import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aula } from 'src/app/models/aula';
import { ProfessorTurmaDisciplina } from 'src/app/models/professorTurmaDisciplina';
import { AulaService } from 'src/app/services/aula.servic';
import { professorTurmaDisciplinaService } from 'src/app/services/professorTurmaDisciplina.service';

@Component({
  selector: 'app-aula-update',
  templateUrl: './aula-update.component.html',
  styleUrls: ['./aula-update.component.css']
})
export class AulaUpdateComponent implements OnInit {

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
  
  update(): void {
    this.service.update(this.aulas).subscribe(() => {
      this.toast.success('Aula atualizada com sucesso!', 'Atualizado');
      this.router.navigate(['aulas']);
    }, ex => {
      this.toast.error(ex.error.error);
    })
  }

  listarProf(): void {
    this.profService.findAll().subscribe(resposta => {
      this.discs = resposta;
    })
  }

}