import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { AlunoAula } from 'src/app/models/alunoAula';
import { Aula } from 'src/app/models/aula';
import { AlunoService } from 'src/app/services/aluno.service';
import { AlunoAulaService } from 'src/app/services/alunoAula.service';
import { AulaService } from 'src/app/services/aula.servic';

@Component({
  selector: 'app-frequencia-update',
  templateUrl: './frequencia-update.component.html',
  styleUrls: ['./frequencia-update.component.css']
})
export class FrequenciaUpdateComponent implements OnInit {

  frequencia: AlunoAula = {
    id: '',
    frequencia: '',
    aula: '',
    conteudoAula: '',
    aluno: '',
    nomeAluno: ''
  }

  alunos: Aluno[] = [];
  aulas: Aula[] = [];
  
  constructor(
    private toast: ToastrService,
    private router: Router,
    private service: AlunoAulaService,
    private alunoService: AlunoService,
    private aulaService: AulaService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    
    this.frequencia.id = this.route.snapshot.paramMap.get('id');
    this.listarAluno();
    this.listarAula();
    this.findById();
  }

  cancel(): void {
    this.router.navigate(['frequencia'])
  }

  findById(): void {
    this.service.findById(this.frequencia.id).subscribe(resposta => {
      this.frequencia = resposta;
    }, ex => {
      this.toast.error(ex.error.error);
    });
  }

  update(): void {
    this.service.update(this.frequencia).subscribe(() => {
      this.toast.success('Atualizado com sucesso!', 'Atualizar');
      this.router.navigate(['frequencia']);
    }, ex => {
      this.toast.error(ex.error.error);
    })
  }

  listarAluno(): void {
    this.alunoService.findAll().subscribe(resposta => {
      this.alunos = resposta;
    })
  }

  listarAula(): void {
    this.aulaService.findAll().subscribe(resposta => {
      this.aulas = resposta;
    })
  }

}