import { CustomValidators } from 'app/components/validators/custom-validators';
import { Cnpj } from './../../../../models/cnpj.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { state } from '@angular/animations';
import { StatusUsuario } from './../../../../models/statususuario.enum';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { UsuarioService } from 'app/@core/data/usuario.service';
import { AbstractEntityComponent } from 'app/components/abstract';
import { TipoUsuario } from 'app/models/tipousuario.enum';
import { Usuario } from 'app/models/usuario.model';
import { CadastroTelefoneComponent } from '../../../forms/cadastro-telefone/cadastro-telefone.component';
import {map, startWith} from 'rxjs/operators';
import { CnpjService } from '../../../../@core/data/cnpj.service';
import { CadastroCnpjComponent } from '../../../forms/cadastro-cnpj/cadastro-cnpj.component';

@Component({
  selector: 'usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss'],
})
export class UsuarioEditComponent extends AbstractEntityComponent<Usuario, UsuarioService> {

  @ViewChild(CadastroTelefoneComponent)
  telefoneArrayComp: CadastroTelefoneComponent;

  @ViewChild(CadastroCnpjComponent)
  cnpjArrayComp: CadastroCnpjComponent;

  entity: Usuario;
  niveis = TipoUsuario;
  listaStatus = StatusUsuario;

  constructor(
    activatedRoute: ActivatedRoute,
    service: UsuarioService,
    fb: FormBuilder,
    router: Router,
    snackBar: MatSnackBar, private cnpjService: CnpjService) {
    super(activatedRoute, service, fb, router, new Usuario(), snackBar);

  }

  get usuarioForm() { return this.entityForm; }

  get formTitle(): string {
    return this.isNew ? `New User` : `Edit User`;
  }

  getListUrlRoute(): UrlTree {
    return this.router.createUrlTree(['../..'], { relativeTo: this.activatedRoute });
  }

  updateEntity(newEntity?: Usuario): void {
    this.entity = newEntity || new Usuario();
    this.entityForm.patchValue(this.entity);
  }

  comparadorEnum(ob1: TipoUsuario, ob2: TipoUsuario){
    return ob1 != null && ob2 != null && ob1.toString() === ob2.toString();
  }

}
