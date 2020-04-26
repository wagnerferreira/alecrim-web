import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemetenteComponent } from './remetente/remetente.component';
import { ImportDestinatarioComponent } from './import-destinatario/import-destinatario.component';
import { EnviarMensagemComponent } from './enviar-mensagem/enviar-mensagem.component';

const routes: Routes = [
  {
    path: 'remetente',
    component: RemetenteComponent
  },
  {
    path: 'import-destinatario',
    component: ImportDestinatarioComponent
  },
  {
    path: "enviar-mensagem",
    component: EnviarMensagemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
