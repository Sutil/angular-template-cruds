import { BasicEntity } from './base/basicentity.model';

export class Usuario extends BasicEntity {
    public username: string = '';
    public password: string = '';
    public name: string = '';
    constructor () {
        super();
    }
}