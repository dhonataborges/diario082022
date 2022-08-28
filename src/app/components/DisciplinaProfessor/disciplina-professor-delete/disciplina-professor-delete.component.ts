import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Disciplina } from 'src/app/models/disciplina';
import { Professor } from 'src/app/models/professor';
import { ProfessorTurma } from 'src/app/models/professorTurma';
import { ProfessorTurmaDisciplina } from 'src/app/models/professorTurmaDisciplina';
import { Turma } from 'src/app/models/turma';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { ProfessorTurmaService } from 'src/app/services/professorTurma.service ';
import { professorTurmaDisciplinaService } from 'src/app/services/professorTurmaDisciplina.service';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-disciplina-professor-delete',
  templateUrl: './disciplina-professor-delete.component.html',
  styleUrls: ['./disciplina-professor-delete.component.css']
})
export class DisciplinaProfessorDeleteComponent implements OnInit {

  disciplinaProfessor: ProfessorTurmaDisciplina = {
    id: '',    
    professor: '',
    nomeProfessor: '', 
    turma: '',
	  descricaoTurma: '',  
    disciplina: '',
    nomeDisciplina: '',  
    anoLetivo: '',
    bimestre: '',
    dataAtribuicao: '',
    status: ''
  }

  disciplinas: Disciplina[] = [];
  professores: Professor[] = [];
  turmas: Turma[] = [];

  constructor(
    private turmaService: TurmaService,
    private professorService: ProfessorService,
    private disciplinaService: DisciplinaService,
    private service: professorTurmaDisciplinaService,
    private toast: ToastrService,   
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.disciplinaProfessor.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.listarProf();
    this.listarDisciplina();
    this.listarTurma();
  }

  cancel(): void {
    this.router.navigate(['disciplinaProfessor'])
  }
  
  findById(): void {
    this.service.findById(this.disciplinaProfessor.id).subscribe(resposta => {
      this.disciplinaProfessor = resposta;
    }, ex => {
      this.toast.error(ex.error.error);
    });
  }

  delete(): void {
    this.service.delete(this.disciplinaProfessor.id).subscribe(() => {
      this.toast.error('Deletato com sucesso!', 'Delete');
      this.router.navigate(['entrumacao']);
    }, err => {
      if (err.error.error.match('possui aulas')) {
        this.toast.error(err.error.error);
      }
    })
  }


  listarProf(): void {
    this.professorService.findAll().subscribe(resposta => {
      this.professores = resposta;
    })
  }

  listarDisciplina(): void {
    this.disciplinaService.findAll().subscribe(resposta => {
      this.disciplinas = resposta;
    })
  }

  listarTurma(): void {
    this.turmaService.findAll().subscribe(resposta => {
      this.turmas = resposta;
    })
  }

  }