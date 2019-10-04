import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConuterMediaISVService {

  constructor(private http: HttpClient) { }

  async findIsvs(): Promise<any[]> {
    return this.http.get<any[]>(
      environment.urlISVMensal(),
      {headers: this.getHeaders()},
    ).toPromise();
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
    });
    return headers;
  }
}
