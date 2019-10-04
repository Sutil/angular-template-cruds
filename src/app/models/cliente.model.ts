import { Ramo } from './ramo.model';
import { Atividade } from './atividade.model';
import { Endereco } from './endereco.model';
import { BasicEntity } from './base/basicentity.model';
import { Telefone } from './telefone.model';
import { Regiao } from './regiao.model';
import { Segmento } from './segmento.model';

export class Socio extends BasicEntity {
    nome: string = '';
    percentual: number = 0;
    cpf: string = '';
    funcao: string = ''; 
}
export class Cliente extends BasicEntity {

    cnpj:string = "";
    razaoSocial: string = "";
    nomeFantasia: string = "";
    regiao: Regiao = new Regiao();
    segmento: Segmento = new Segmento();
    atividade: Atividade = new Atividade();
    ramo: Ramo = new Ramo();
    endereco: Endereco = new Endereco();
    site:string = "";
    telefone: string = ""
    celular: string = "";

    clienteNovo:boolean = true; 
}