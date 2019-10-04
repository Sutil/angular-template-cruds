import { Risco } from './risco.enum';
import { BasicEntity } from './base/basicentity.model';

export class Resposta extends BasicEntity {
    public descricao: string = '';
    public risco: number = null;
}