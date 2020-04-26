import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class PessoaModel {
    id?: number;
    tipo?: string;
    nome: string;
    endereco: string;
    telefone: string;
    cpf: string;
    email: string;
}

@Injectable({
    providedIn: "root"
})
export class RemetenteService {

    private readonly url = '/api/remetente';

    constructor(private http: HttpClient) {
    }

    save(remetente: PessoaModel) {
        return this.http.post(this.url, remetente);
    }

    edit(remetente: PessoaModel) {
        return this.http.put(`${this.url}/${remetente.id}`, remetente);
    }

    findOne(id: number) {
        return this.http.get(`${this.url}/${id}`).pipe(map(r => r as PessoaModel));
    }

    remove(id: number) {
        return this.http.delete(`${this.url}/${id}`);
    }

    findAll(): Observable<PessoaModel[]> {
        return this.http.get(this.url).pipe(map(r => r as PessoaModel[]));
    }

}