import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IsvSemanalService {

  constructor(private http: HttpClient) {}

  async getData(): Promise<any[]> {
    return await this.http
      .get<any[]>(environment.urlISVSemanal(), {
        headers: this.getHeaders(),
      })
      .toPromise();
  }

  async getDataAnual(): Promise<any[]> {
    return await this.http
      .get<any[]>(environment.urlISVAnual(), {
        headers: this.getHeaders(),
      })
      .toPromise();
  }

  async getDataMensal(): Promise<any[]> {
    return await this.http
      .get<any[]>(environment.urlISVMensal(), {
        headers: this.getHeaders(),
      })
      .toPromise();
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    });
    return headers;
  }
}
