import { AbstractEntityServiceMock } from './abstract-mock-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Regional } from 'app/models/regional.model';
import { Observable } from 'rxjs';

@Injectable()
export class RegionalServiceMock extends AbstractEntityServiceMock<Regional> {

  getBaseUrl(): string {
    return './assets/mock/regional.findall.json';
  }
  getEntityName(): string {
    return 'Regional';
  }
  newEntity(): Regional {
    return new Regional();
  }

  findByDivisao(id: number): Observable<Regional[]> {
    // Como é apenas um mock vamos fazer isso mesmo
    return this.findAll();
  }
  
  constructor(protected http: HttpClient) {
    super(http);
  }
}
