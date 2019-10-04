import { BasicEntity } from './base/basicentity.model';
import { Resposta } from './resposta.model';
import { TipoCriterio } from './tipocriterio.enum';

export class CriterioAnalise extends BasicEntity {
    public nome: string = '';
    public tipo: TipoCriterio = null;
    public descricao: String = '';
    public respostas: Resposta[] = [];
    public obrigatorio: boolean = false;
    public peso: number = 1.0;
}
