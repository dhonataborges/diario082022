import { ProfessorTurmaDisciplina } from './../../../models/professorTurmaDisciplina';
import { Router } from '@angular/router';
import { Turma } from 'src/app/models/turma';
import { Component, OnInit } from '@angular/core';
import { professorTurmaDisciplinaService } from 'src/app/services/professorTurmaDisciplina.service';

@Component({
  selector: 'app-portal-professor',
  templateUrl: './portal-professor.component.html',
  styleUrls: ['./portal-professor.component.css']
})
export class PortalProfessorComponent implements OnInit {

  disciplinas: ProfessorTurmaDisciplina[] = [];
    
  turma: Turma[] = []; 

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
 

  constructor(
    private router: Router,
    private service: professorTurmaDisciplinaService) { }

  ngOnInit(): void {
    this.findAll();
    this.listarDisciplina();
  }

  navigateTurmaAlunos(): void {
    this.router.navigate(['turmaAlunos'])
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((todo) => {
        this.disciplinas.push(todo);
      })
    });
  }

  listarDisciplina(): void {
    this.service.findAll().subscribe(resposta => {
      this.disciplinas = resposta;
    })
  }
}