import { professorTurmaDisciplinaService } from 'src/app/services/professorTurmaDisciplina.service';
import { AtividadeService } from 'src/app/services/atividade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Atividade } from 'src/app/models/atividade';
import { ProfessorTurmaDisciplina } from 'src/app/models/professorTurmaDisciplina';

@Component({
  selector: 'app-atividade-update',
  templateUrl: './atividade-update.component.html',
  styleUrls: ['./atividade-update.component.css']
})
export class AtividadeUpdateComponent implements OnInit {

  atividades: Atividade = {
    id: '',
    dataCriacao: '',
    dataEntrega:'',
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
    
    update(): void {
      this.service.update(this.atividades).subscribe(() => {
        this.toast.success('Atividades atualizada com sucesso!');
        this.router.navigate(['atividades']);
      }, ex => {
        this.toast.error(ex.error.error);
      })
    }
  
    listarProf(): void {
      this.profService.findAll().subscribe(resposta => {
        this.discs = resposta;
      })
    }
  
  }