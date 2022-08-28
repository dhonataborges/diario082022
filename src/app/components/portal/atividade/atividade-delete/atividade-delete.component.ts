import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Atividade } from 'src/app/models/atividade';
import { ProfessorTurmaDisciplina } from 'src/app/models/professorTurmaDisciplina';
import { AtividadeService } from 'src/app/services/atividade.service';
import { professorTurmaDisciplinaService } from 'src/app/services/professorTurmaDisciplina.service';

@Component({
  selector: 'app-atividade-delete',
  templateUrl: './atividade-delete.component.html',
  styleUrls: ['./atividade-delete.component.css']
})
export class AtividadeDeleteComponent implements OnInit {

  atividades: Atividade = {
    id: '',
    dataCriacao: '',
    dataEntrega: '',
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
    private route: ActivatedRoute,
    private service: AtividadeService,
    private profService: professorTurmaDisciplinaService) { }

  ngOnInit(): void {
    this.atividades.id = this.route.snapshot.paramMap.get('id');
    this.listarProf();
    this.findById();
  }

  cancel(): void {
    this.router.navigate(['atividades'])
  }

  findById(): void {
    this.service.findById(this.atividades.id).subscribe(resposta => {
      this.atividades = resposta;
    }, ex => {
      this.toast.error(ex.error.error);
    });
  }

  delete(): void {
    this.service.delete(this.atividades.id).subscribe(() => {
      this.toast.error('Atividade deletato com sucesso!', 'Deletado');
      this.router.navigate(['atividades']);
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