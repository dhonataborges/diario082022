import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Disciplina } from 'src/app/models/disciplina';
import { SerieNivelSubnivel } from 'src/app/models/serieNivelSubnivel';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { SerieNivelSubnivelService } from 'src/app/services/serieNivelSubnivel.service ';

@Component({
  selector: 'app-disciplina-update',
  templateUrl: './disciplina-update.component.html',
  styleUrls: ['./disciplina-update.component.css']
})
export class DisciplinaUpdateComponent implements OnInit {

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

  update(): void {
    this.service.update(this.disciplina).subscribe(() => {
      this.toast.success('disciplina atualizada com sucesso!');
      this.router.navigate(['disciplinas']);
    }, ex => {
      this.toast.error(ex.error.error);
    })
  }

  }