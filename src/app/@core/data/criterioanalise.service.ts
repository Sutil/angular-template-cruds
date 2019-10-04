import { AbstractEntityService } from './abstract-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriterioAnalise } from '../../models/criterioanalise.model';
import { environment } from 'environments/environment';

@Injectable()
export class CriterioAnaliseService extends AbstractEntityService<CriterioAnalise> {

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