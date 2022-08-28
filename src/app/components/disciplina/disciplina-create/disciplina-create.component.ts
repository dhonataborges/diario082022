import { DisciplinaService } from './../../../services/disciplina.service';
import { Disciplina } from './../../../models/disciplina';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SerieNivelSubnivelService } from 'src/app/services/serieNivelSubnivel.service ';
import { SerieNivelSubnivel } from 'src/app/models/serieNivelSubnivel';

@Component({
  selector: 'app-disciplina-create',
  templateUrl: './disciplina-create.component.html',
  styleUrls: ['./disciplina-create.component.css']
})
export class DisciplinaCreateComponent implements OnInit {

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
    private toast: ToastrService,   
    private router: Router
  ) { }

  ngOnInit(): void {
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

  create(): void {
    this.service.create(this.disciplina).subscribe((resposta) => {
      this.router.navigate(['disciplinas'])
      this.toast.success('Disciplina criada com sucesso!')
    })
  }

  }