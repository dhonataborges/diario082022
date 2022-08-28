import { ToastrService } from 'ngx-toastr';
import { SerieNivelSubnivel } from './../../../models/serieNivelSubnivel';
import { Professor } from './../../../models/professor';
import { Turma } from './../../../models/turma';
import { FormControl, Validators } from '@angular/forms';
import { AlunoService } from 'src/app/services/aluno.service';
import { Router } from '@angular/router';
import { Aluno } from 'src/app/models/aluno';
import { Component, OnInit } from '@angular/core';
import { TurmaService } from 'src/app/services/turma.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { SerieNivelSubnivelService } from 'src/app/services/serieNivelSubnivel.service ';

@Component({
  selector: 'app-turma-create',
  templateUrl: './turma-create.component.html',
  styleUrls: ['./turma-create.component.css']
})
export class TurmaCreateComponent implements OnInit {
 
  turma: Turma = {
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
    private turmaService: TurmaService,
    private toast: ToastrService,   
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarSerie();
  }

  cancel(): void {
    this.router.navigate(['turmas'])
  }
  
  create(): void {
    this.turmaService.create(this.turma).subscribe((resposta) => {
      this.router.navigate(['turmas'])
      this.toast.success('Turma adicionadas com sucesso!')
    })
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