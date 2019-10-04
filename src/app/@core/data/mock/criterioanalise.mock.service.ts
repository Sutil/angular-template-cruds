import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CriterioAnalise } from 'app/models/criterioanalise.model';

import { AbstractEntityServiceMock } from './abstract-mock-service';
import { environment } from 'environments/environment';

@Injectable()
export class CriterioAnaliseServiceMock extends AbstractEntityServiceMock<CriterioAnalise> {

  getBaseUrl(): string {
    return environment.urlCriterio();
  }
  getEntityName(): string {
    return 'Critério de análise de risco';
  }
  newEntity(): CriterioAnalise {
    return new CriterioAnalise();
  }

  constructor(protected http: HttpClient) {
    super(http);
  }
}
