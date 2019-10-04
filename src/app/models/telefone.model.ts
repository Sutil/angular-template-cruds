import { BasicEntity } from './base/basicentity.model';

export class Telefone extends BasicEntity {
    public descricao: string = '';
    public ddd: string = '';
    public telefone: string = '';
    public ramal: string = '';
}
