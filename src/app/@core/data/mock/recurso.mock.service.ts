import { Recurso } from './../../../models/recurso.model';

import { AbstractEntityServiceMock } from './abstract-mock-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class RecursoServiceMock extends AbstractEntityServiceMock<Recurso>{

  getBaseUrl(): string {
    return environment.urlRecurso();
  }
  getEntityName(): string {
      return 'Resource';
  }
  newEntity(): Recurso {
      return new Recurso();
  }

  constructor(protected http: HttpClient) {
      super(http);
  }

}