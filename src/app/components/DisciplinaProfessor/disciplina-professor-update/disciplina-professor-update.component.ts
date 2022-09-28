import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { professorTurmaDisciplinaService } from './../../../services/professorTurmaDisciplina.service';
import { DisciplinaService } from './../../../services/disciplina.service';
import { ProfessorTurmaService } from './../../../services/professorTurma.service ';
import { ProfessorTurmaDisciplina } from './../../../models/professorTurmaDisciplina';
import { ProfessorTurma } from './../../../models/professorTurma';
import { Disciplina } from './../../../models/disciplina';
import { Component, OnInit } from '@angular/core';
import { TurmaService } from 'src/app/services/turma.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { Professor } from 'src/app/models/professor';
import { Turma } from 'src/app/models/turma';

@Component({
  selector: 'app-disciplina-professor-update',
  templateUrl: './disciplina-professor-update.component.html',
  styleUrls: ['./disciplina-professor-update.component.css']
})
export class DisciplinaProfessorUpdateComponent implements OnInit {

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

  update(): void {
   // console.log("Teste", this.disciplinaProfessor)
    this.service.update(this.disciplinaProfessor).subscribe(() => {
      this.toast.success('Enturmação atualizado com sucesso!', 'Atualizado');
      this.router.navigate(['disciplinaProfessor']);
    }, ex => {
      this.toast.error(ex.error.error);
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