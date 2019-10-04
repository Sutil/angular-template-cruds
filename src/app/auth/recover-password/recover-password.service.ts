import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ResponseType } from '@angular/http';
import { environment } from 'environments/environment';
import { RedefinePassword } from './redefinepassword.model';

@Injectable({
  providedIn: 'root',
})
export class RecoverPasswordService {

  constructor(private http: HttpClient) {
  }

  async redefinirSenha(redefinePassword: RedefinePassword): Promise<any> {
    try {
      return await this.http.post(
        environment.urlRedefinePassword(),
        redefinePassword,
        {headers: this.getHeaders(), responseType: 'text'},
      ).toPromise();
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      if (httpError.error) {
        throw new Error(httpError.error);
      }
      throw new Error('Erro ao redefinir senha');
    }
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return headers;
  }
}
