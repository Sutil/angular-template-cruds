import { Organizacao } from './base/organizacao.model';
import { Regional } from './regional.model';
import { BasicEntity } from './base/basicentity.model';

export class Filial extends BasicEntity {
    public razaoSocial: string = '';
    public cnpj: string = '';
}