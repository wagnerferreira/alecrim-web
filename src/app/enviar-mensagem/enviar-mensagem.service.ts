import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class EnviarMensagemService {

    private readonly url = '/api/enviar-mensagem';

    constructor(private httpClient: HttpClient) {
    }

}