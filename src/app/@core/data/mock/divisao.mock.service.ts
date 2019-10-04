import { AbstractEntityServiceMock } from './abstract-mock-service';
import { Divisao } from 'app/models/divisao.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DivisaoServiceMock extends AbstractEntityServiceMock<Divisao> {

  getBaseUrl(): string {
    return './assets/mock/divisao.findall.json';
  }
  getEntityName(): string {
    return 'Divisao';
  }
  newEntity(): Divisao {
    return new Divisao();
  }

  findByEmpresa(id: number): Observable<Divisao[]> {
    if (id === 1) {
      return this.http.get<Divisao[]>('./assets/mock/divisao.findbyempresa.json');
    } else {
      return this.findAll();
    }
  }

  constructor(protected http: HttpClient) {
    super(http);
  }
}
