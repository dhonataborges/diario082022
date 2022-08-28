import { Aula } from 'src/app/models/aula';
import { AulaService } from 'src/app/services/aula.servic';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-aula-views',
  templateUrl: './aula-views.component.html',
  styleUrls: ['./aula-views.component.css']
})
export class AulaViewsComponent implements OnInit {

  aula: Aula = {
    data: '',
    horaInicio: '',
    horaFim: '',
    conteudo: '',
    disciplina: '',
    nomeDisciplina: ''
  }
  
  constructor(
    private route: ActivatedRoute,
    private service: AulaService,
    private router: Router) { }

  ngOnInit(): void {
    this.aula.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById():void {
    this.service.findById(this.aula.id).subscribe(resposta => {
      this.aula = resposta;
      this.findById();
    })
  }

  voltar(): void {
    this.router.navigate(['aulas'])
  }
}
