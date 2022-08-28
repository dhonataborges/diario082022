import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { TurmaService } from 'src/app/services/turma.service';
import { SerieNivelSubnivelService } from './../../../services/serieNivelSubnivel.service ';
import { SerieNivelSubnivel } from './../../../models/serieNivelSubnivel';
import { Turma } from 'src/app/models/turma';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turma-delete',
  templateUrl: './turma-delete.component.html',
  styleUrls: ['./turma-delete.component.css']
})
export class TurmaDeleteComponent implements OnInit {

  turma: Turma = {
    id:'',
    anoLetivo: '',
    sala: '',
    serieNivelSubnivel: '',
    nomeSerieNivelSubnivel: ''
  }

  series: SerieNivelSubnivel[] = [];
  
  constructor(    
    private toast: ToastrService,
    private serieService: SerieNivelSubnivelService,
    private service: TurmaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.turma.id = this.route.snapshot.paramMap.get('id');
    this.listarSerie();
    this.findById();
  }

  cancel(): void {
    this.router.navigate(['turmas'])
  }

  findById(): void {
    this.service.findById(this.turma.id).subscribe(resposta => {
      this.turma = resposta;
    }, ex => {
      this.toast.error(ex.error.error);
    });
  }

 delete(): void {
    this.service.delete(this.turma.id).subscribe(() => {
      this.toast.error('Turma deletato com sucesso!', 'Delete');
      this.router.navigate(['turmas']);
    }, err => {
      if (err.error.error.match('possui alunos')) {
        this.toast.error(err.error.error);
      }
      if (err.error.error.match('possui professor')) {
        this.toast.error(err.error.error);
      }
    })
  }

  listarSerie(): void {
    this.serieService.findAll().subscribe(resposta => {
      this.series = resposta;
    })
  }
}