import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "environments/environment";
import { HttpErrorResponse } from '@angular/common/http';

export class ChangePassword {
    senhaAtual: string;
    senhaNova: string;
    senhaNovaCopy: string;
}

@Injectable()
export class ChangePasswordService {

    constructor(private http: HttpClient) {

    }
    async changePassword(senhas: ChangePassword) {

        try {
            return await this.http.post(
                environment.urlChangePassword(),
                senhas,
                { headers: this.getHeaders() }).toPromise();
        } catch (error) {
            const httpError = error as HttpErrorResponse;
            if (httpError.error instanceof ErrorEvent) {
                throw new Error('Houve um erro ao fazer a busca.');
            } else {
                const status = httpError.status; //401, 404, etc
                const body = httpError.error;
                if (status === 401) {
                    throw new Error('Você não tem acesso para usar este recurso');
                }
                else if (status === 403) {
                    throw new Error('Senha Atual incorreta');
                }
                else if (status === 206) {
                    throw new Error('Senha Alterada com Sucesso, problema ao enviar email.');
                }
                else {
                    throw new Error('Erro desconhecido');
                }
            }
        }
    }

    private getHeaders(): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
        });
        return headers;
    }
}