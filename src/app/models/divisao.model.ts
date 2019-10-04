import { Regional } from './regional.model';
import { Empresa } from './empresa.model';
import { Organizacao } from './base/organizacao.model';

export class Divisao extends Organizacao {
    public nome: string = '';
    public empresa: Empresa = new Empresa();
}
