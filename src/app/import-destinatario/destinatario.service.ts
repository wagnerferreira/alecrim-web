import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PessoaModel } from '../remetente/remetente.service';
import { map } from 'rxjs/operators';
import { MensagemModel } from '../enviar-mensagem/enviar-mensagem.component';

@Injectable({
    providedIn: "root"
})
export class DestinatarioService {

    private readonly url = '/api/destinatario';
    private readonly urlMensagem = '/api/enviar-mensagem';


    constructor(private httpClient: HttpClient) {
    }

    postFile(file: File) {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.httpClient
            .post(`${this.url}/upload`, formData);
    }

    findAll(): Observable<PessoaModel[]> {
        return this.httpClient.get(this.url).pipe(map(r => r as PessoaModel[]));
    }

    enviarMensagem(mensagem: MensagemModel) {
        return this.httpClient.post(this.urlMensagem, mensagem);
    }

}