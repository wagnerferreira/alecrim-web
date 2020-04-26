import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PessoaModel, RemetenteService } from './remetente.service';

@Component({
  selector: 'app-remetente',
  templateUrl: './remetente.component.html',
  styleUrls: ['./remetente.component.css']
})
export class RemetenteComponent implements OnInit {

  pessoaForm: FormGroup;
  dataSource: PessoaModel[];
  displayedColumns: string[] = ['nome', 'email'];

  @ViewChild("form", { static: true }) form;

  constructor(private remetenteService: RemetenteService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.pessoaForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      telefone: new FormControl(),
      email: new FormControl(null, [Validators.required, Validators.email]),
      endereco: new FormControl(),
      cpf: new FormControl(),
      id: new FormControl(),
      tipo: new FormControl()
    });

    this.loadRemetentes();
  }

  onSubmit() {
    if (this.pessoaForm.invalid) {
      return;
    }

    let model: PessoaModel = {
      nome: this.pessoaForm.get("nome").value,
      email: this.pessoaForm.get("email").value,
      endereco: this.pessoaForm.get("endereco").value,
      telefone: this.pessoaForm.get("telefone").value,
      cpf: this.pessoaForm.get("cpf").value,
      id: this.pessoaForm.get("id").value,
      tipo: this.pessoaForm.get("tipo").value
    }

    this.remetenteService.save(model).subscribe(
      res => {
        this.loadRemetentes();
        this.pessoaForm.setValue(res);
        this.openSnackBar("Inserido com sucesso");
      },
      err => {
        this.openSnackBar("Error");
      });
  }

  loadRemetentes() {
    this.remetenteService.findAll().subscribe(data => this.dataSource = data);
  }

  excluir() {
    this.remetenteService.remove(this.pessoaForm.get("id").value).subscribe(
      res => {
        this.loadRemetentes();
        this.cleanForm();
        this.openSnackBar("Exlcuido com sucesso");
      },
      err => {
        this.openSnackBar("Error");
      });;
  }

  select(remetente: PessoaModel) {
    this.pessoaForm.setValue(remetente);
  }

  cleanForm() {
    this.form.resetForm();
    this.pessoaForm.reset();
  }

  get nome() {
    return this.pessoaForm.get('nome');
  }

  get email() {
    return this.pessoaForm.get('email');
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
