import { Cliente, Socio } from './cliente.model';
import { BasicEntity } from './base/basicentity.model';

export class AnaliseDeCredito extends BasicEntity{
    cliente: Cliente = new Cliente();
    socios: Socio[] = [];
    dataAnalise: Date = new Date();
    validadeAnalise: Date = new Date();
    resultado: String = '';
}
