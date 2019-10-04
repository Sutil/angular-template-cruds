import { Organizacao } from './base/organizacao.model';

export class Empresa extends Organizacao {
    cnpj: string = '';
    razaoSocial: string = '';

    constructor() {
        super();
    }
}