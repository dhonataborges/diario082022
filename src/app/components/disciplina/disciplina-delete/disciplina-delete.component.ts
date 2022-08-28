import { Disciplina } from './../../../models/disciplina';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplinaService } from './../../../services/disciplina.service';
import { SerieNivelSubnivelService } from './../../../services/serieNivelSubnivel.service ';
import { SerieNivelSubnivel } from './../../../models/serieNivelSubnivel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disciplina-delete',
  templateUrl: './disciplina-delete.component.html',
  styleUrls: ['./disciplina-delete.component.css']
})
export class DisciplinaDeleteComponent implements OnInit {

  disciplina: Disciplina = {
    id: '',
    nome: '',
    ementa: '',
    serieNivelSubnivel: '',
	  nomeSerieNivelSubnivel: ''
  }

  series: SerieNivelSubnivel[] = [];

 constructor(
    private serieService: SerieNivelSubnivelService,
    private service: DisciplinaService,
    private route: ActivatedRoute,
    private toast: ToastrService,   
    private router: Router
  ) { }

  ngOnInit(): void {
    this.disciplina.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.listarSerie();
  }

  cancel(): void {
    this.router.navigate(['disciplinas'])
  }

  listarSerie(): void {
    this.serieService.findAll().subscribe(resposta => {
      this.series = resposta;
    })
  }

  findById(): void {
    this.service.findById(this.disciplina.id).subscribe(resposta => {
      this.disciplina = resposta;
    }, ex => {
      this.toast.error(ex.error.error);
    });
  }

  delete(): void {
    this.service.delete(this.disciplina.id).subscribe(() => {
      this.toast.error('Disciplina deletada com sucesso!', 'Delete');
      this.router.navigate(['disciplinas']);
    }, err => {
      if (err.error.error.match('possui alunos')) {
        this.toast.error(err.error.error);
      }
      if (err.error.error.match('possui professor')) {
        this.toast.error(err.error.error);
      }
    })
  }


  }