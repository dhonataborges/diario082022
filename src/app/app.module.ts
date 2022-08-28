import { ProfessorUpdadeComponent } from './components/professor/professor-updade/professor-updade.component';
import { ProfessorReadComponent } from './components/professor/professor-read/professor-read.component';
import { ProfessorDeleteComponent } from './components/professor/professor-delete/professor-delete.component';
import { ProfessorCreateComponent } from './components/professor/professor-create/professor-create.component';
import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatMenuModule} from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { AlunoReadComponent } from './components/aluno/aluno-read/aluno-read.component';
import { AlunoCreateComponent } from './components/aluno/aluno-create/aluno-create.component';
import { AlunoUpdateComponent } from './components/aluno/aluno-update/aluno-update.component';
import { AlunoDeleteComponent } from './components/aluno/aluno-delete/aluno-delete.component';
import { MatNativeDateModule } from '@angular/material/core';

import { TurmaReadComponent } from './components/turma/turma-read/turma-read.component';
import { TurmaCreateComponent } from './components/turma/turma-create/turma-create.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { TurmaDeleteComponent } from './components/turma/turma-delete/turma-delete.component';
import { TurmaUpdateComponent } from './components/turma/turma-update/turma-update.component';
import { PortalProfessorComponent } from './components/portal/portal-professor/portal-professor.component';
import { TurmaListAlunosComponent } from './components/turma/turma-list-alunos/turma-list-alunos.component';
import { AulaRegistrarComponent } from './components/portal/aula/aula-registrar/aula-registrar.component';
import { AulaReadComponent } from './components/portal/aula/aula-read/aula-read.component';
import { AulaUpdateComponent } from './components/portal/aula/aula-update/aula-update.component';
import { AtividadeReadComponent } from './components/portal/atividade/atividade-read/atividade-read.component';
import { AtividadeRegistrarComponent } from './components/portal/atividade/atividade-registrar/atividade-registrar.component';
import { AtividadeUpdateComponent } from './components/portal/atividade/atividade-update/atividade-update.component';
import { FrequenciaReadComponent } from './components/portal/frequencia/frequencia-read/frequencia-read.component';
import { NotaReadComponent } from './components/portal/nota/nota-read/nota-read.component';
import { AulaViewsComponent } from './components/portal/aula/aula-views/aula-views.component';
import { AulaDeleteComponent } from './components/portal/aula/aula-delete/aula-delete.component';
import { AtividadeDeleteComponent } from './components/portal/atividade/atividade-delete/atividade-delete.component';
import { NotaRegistrarComponent } from './components/portal/nota/nota-registrar/nota-registrar.component';
import { NotaUpdateComponent } from './components/portal/nota/nota-update/nota-update.component';
import { NotaDeleteComponent } from './components/portal/nota/nota-delete/nota-delete.component';
import { DisciplinaProfessorReadComponent } from './components/DisciplinaProfessor/disciplina-professor-read/disciplina-professor-read.component';
import { DisciplinaProfessorCreateComponent } from './components/DisciplinaProfessor/disciplina-professor-create/disciplina-professor-create.component';
import { DisciplinaProfessorUpdateComponent } from './components/DisciplinaProfessor/disciplina-professor-update/disciplina-professor-update.component';
import { DisciplinaProfessorDeleteComponent } from './components/DisciplinaProfessor/disciplina-professor-delete/disciplina-professor-delete.component';
import { DisciplinaReadComponent } from './components/disciplina/disciplina-read/disciplina-read.component';
import { DisciplinaCreateComponent } from './components/disciplina/disciplina-create/disciplina-create.component';
import { DisciplinaUpdateComponent } from './components/disciplina/disciplina-update/disciplina-update.component';
import { DisciplinaDeleteComponent } from './components/disciplina/disciplina-delete/disciplina-delete.component';
import { EnturmaAlunosComponent } from './components/turma/enturma-alunos/enturma-alunos.component';
import { FrequenciaCreateComponent } from './components/portal/frequencia/frequencia-create/frequencia-create.component';
import { FrequenciaUpdateComponent } from './components/portal/frequencia/frequencia-update/frequencia-update.component';
import { FrequenciaDeleteComponent } from './components/portal/frequencia/frequencia-delete/frequencia-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    HeaderComponent,
    AlunoReadComponent,
    AlunoCreateComponent,
    AlunoUpdateComponent,
    AlunoDeleteComponent,
    ProfessorCreateComponent,
    ProfessorDeleteComponent,
    ProfessorReadComponent,
    ProfessorUpdadeComponent,
    TurmaReadComponent,
    TurmaCreateComponent,
    LoginComponent,
    TurmaDeleteComponent,
    TurmaUpdateComponent,
    PortalProfessorComponent,
    TurmaListAlunosComponent,
    AulaRegistrarComponent,
    AulaReadComponent,
    AulaUpdateComponent,
    AtividadeReadComponent,
    AtividadeRegistrarComponent,
    AtividadeUpdateComponent,
    FrequenciaReadComponent,
    NotaReadComponent,
    AulaViewsComponent,
    AulaDeleteComponent,
    AtividadeDeleteComponent,
    NotaRegistrarComponent,
    NotaUpdateComponent,
    NotaDeleteComponent,
    DisciplinaProfessorReadComponent,
    DisciplinaProfessorCreateComponent,
    DisciplinaProfessorUpdateComponent,
    DisciplinaProfessorDeleteComponent,
    DisciplinaReadComponent,
    DisciplinaCreateComponent,
    DisciplinaUpdateComponent,
    DisciplinaDeleteComponent,
    EnturmaAlunosComponent,
    FrequenciaCreateComponent,
    FrequenciaUpdateComponent,
    FrequenciaDeleteComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatMenuModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskModule.forRoot(),
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}, AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
