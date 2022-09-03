import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { TurmaService } from 'src/app/services/turma.service';
import { SerieNivelSubnivelService } from './../../../services/serieNivelSubnivel.service ';
import { FormControl, Validators } from '@angular/forms';
import { SerieNivelSubnivel } from './../../../models/serieNivelSubnivel';
import { Turma } from 'src/app/models/turma';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turma-update',
  templateUrl: './turma-update.component.html',
  styleUrls: ['./turma-update.component.css']
})
export class TurmaUpdateComponent implements OnInit {

  turma: Turma = {
    id:'',
    anoLetivo: '',
    sala: '',
    serieNivelSubnivel: '',
    nomeSerieNivelSubnivel: ''
  }

  series: SerieNivelSubnivel[] = [];

  anoLetivo: FormControl = new FormControl(null, [Validators.required]);
  sala: FormControl = new FormControl(null, [Validators.required]);
  serieNivelSubnivel: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private serieService: SerieNivelSubnivelService,
    private toast: ToastrService,   
    private service: TurmaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.turma.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.listarSerie();  
  }
  
  findById(): void {
    this.service.findById(this.turma.id).subscribe(resposta => {
      this.turma = resposta;
    }, ex => {
      this.toast.error(ex.error.error);
    });
  }

  update(): void {
    this.service.update(this.turma).subscribe(() => {
      this.toast.success('Turma atualizada com sucesso!');
      this.router.navigate(['turmas']);
    }, ex => {
      this.toast.error(ex.error.error);
    })
  }

  cancel(): void {
    this.router.navigate(['turmas'])
  }
  
  listarSerie(): void {
    this.serieService.findAll().subscribe(resposta => {
      this.series = resposta;
    })
  }
  errorValidAnoCriacao() {
    if (this.anoLetivo.invalid) {
      return 'Ano de Criação é obrigatório!';
    }
    return false;
  }

  }