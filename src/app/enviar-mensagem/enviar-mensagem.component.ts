import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DestinatarioService } from '../import-destinatario/destinatario.service';
import { RemetenteService, PessoaModel } from '../remetente/remetente.service';
import { MatSnackBar } from '@angular/material';

export class MensagemModel {
  remetente: PessoaModel;
  destinatario: PessoaModel;
  mensagem: string;
}

@Component({
  selector: 'app-enviar-mensagem',
  templateUrl: './enviar-mensagem.component.html',
  styleUrls: ['./enviar-mensagem.component.css']
})
export class EnviarMensagemComponent implements OnInit {

  mensagemForm: FormGroup;
  remetentesList: PessoaModel[];
  destinatariosList: PessoaModel[];

  constructor(private destinatarioService: DestinatarioService, private remetenteService: RemetenteService,  private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.mensagemForm = new FormGroup({
      remetente: new FormControl(),
      destinatario: new FormControl(),
      mensagem: new FormControl()
    });

    this.loadRemetentes();
    this.loadDestinatarios();
  }

  onSubmit() {
    let model: MensagemModel = {
      remetente: this.mensagemForm.get("remetente").value,
      destinatario: this.mensagemForm.get("destinatario").value,
      mensagem: this.mensagemForm.get("mensagem").value,
    }

    this.destinatarioService.enviarMensagem(model).subscribe(
      res => {
        this.mensagemForm.reset();
        this.openSnackBar("Mensagem enviada com sucesso");
      },
      err => {
        this.openSnackBar("Error");
      });
  }

  loadRemetentes() {
    this.remetenteService.findAll().subscribe(
      res => {
        this.remetentesList = res;
      });
  }

  loadDestinatarios() {
    this.destinatarioService.findAll().subscribe(
      res => {
        this.destinatariosList = res;
      });
  }
  
  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
