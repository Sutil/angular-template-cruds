import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { AbstractEntityService } from 'app/@core/data/abstract-service';
import { HttpClient } from '@angular/common/http';
import { AnaliseDeRisco } from '../../models/analisederisco.model';
import { CriterioResposta } from '../../models/criterioresposta.model';

@Injectable()
export class 
AnaliseDeRiscoService extends AbstractEntityService<AnaliseDeRisco> {

  getBaseUrl(): string {
    return environment.urlAnaliseDeRisco();
  }
  getEntityName(): string {
    return 'Análise de risco';
  }
  newEntity(): AnaliseDeRisco {
    return new AnaliseDeRisco();
  }

  calculaRisco(respostas: CriterioResposta[]): string {
    let peso: number = 0.0;
    let risco: number = 0.0;

    for(let criterioResposta of respostas) {
      if ((criterioResposta.criterio != null && criterioResposta.criterio != undefined) &&
         (criterioResposta.resposta != null && criterioResposta.resposta != undefined)) {
          peso = peso + criterioResposta.criterio.peso;
          risco = risco + criterioResposta.resposta.risco * criterioResposta.criterio.peso;
         }
    }

    if (peso > 0.0) {
      return (risco / peso).toString();
    }

    return "Resultado inválido";
  }

  // calculaRisco(respostas: CriterioResposta[]): Promise<string> {
  //   console.log(">>>>>>>>>> calculaRisco::abstract-service.ts: " + JSON.stringify(respostas));
  //   return this.http.post(this.getBaseUrl() + 'calcularrisco', respostas,
  //       { headers: this.getHeaders() }).toPromise()
  //       .then(value => <string>value);
  // }

  constructor(protected http: HttpClient) {
    super(http);
  }
}