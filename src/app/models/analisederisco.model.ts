import { BasicEntity } from './base/basicentity.model';
import { CriterioAnalise } from './criterioanalise.model';
import { Empresa } from './empresa.model';
import { AnaliseDeRiscoStatus } from './analisederiscostatus.enum';
import { CriterioResposta } from './criterioresposta.model';

export class AnaliseDeRisco extends BasicEntity {
    dataAnalise: Date = new Date();
    empresaAnalisada: Empresa = new Empresa;
    criterioRespostas: CriterioResposta[] = [];
    status: AnaliseDeRiscoStatus = null;
    resultado: string = '';
}