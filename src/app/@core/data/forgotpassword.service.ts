import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class ForgotPasswordService {
  constructor(private http: HttpClient) {}

  async recuperaSenha(email): Promise<any> {
    try {
      return await this.http
        .post(environment.urlRecuperaSenha(), email, {
          headers: this.getHeaders(),
          responseType: 'text',
        })
        .toPromise();
    } catch (error) {
      throw new Error('Erro ao recuperar senha');
    }
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return headers;
  }
}
