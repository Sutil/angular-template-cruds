import { BasicEntity } from './base/basicentity.model';
import { Perfil } from './perfil.model';
import { Usuario } from './usuario.model';

export class UsuarioPerfilOrganizacao extends BasicEntity {
    usuario: Usuario = null;
    perfil: Perfil = null;
}