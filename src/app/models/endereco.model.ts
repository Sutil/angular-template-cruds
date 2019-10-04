import { UF } from './uf.enum';
import { BasicEntity } from './base/basicentity.model';
export class Endereco extends BasicEntity {
    cep: string = "";
    endereco: string = "";
    bairro: string = "";
    complemento: string = "";
    estado: string = "";
    cidade: string = "";
}