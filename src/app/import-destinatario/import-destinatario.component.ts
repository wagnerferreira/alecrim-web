import { Component, OnInit } from '@angular/core';
import { DestinatarioService } from './destinatario.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-import-destinatario',
  templateUrl: './import-destinatario.component.html',
  styleUrls: ['./import-destinatario.component.css']
})
export class ImportDestinatarioComponent implements OnInit {

  fileToUpload: File = null;

  constructor(private destinatarioService: DestinatarioService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSelectedFilesChanged(event) {
    this.fileToUpload = event[0];
  }

  onUploadClicked(event) {
    this.destinatarioService.postFile(this.fileToUpload).subscribe(
      res => {
        this.openSnackBar("Inserido com sucesso");
      },
      err => {
        console.log(err);
        this.openSnackBar(err.error);
      });
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
