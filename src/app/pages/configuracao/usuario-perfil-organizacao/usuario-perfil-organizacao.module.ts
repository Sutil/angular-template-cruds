import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
} from '@angular/material'
import { FormWrapperModule } from 'app/components/form-wrapper/form-wrapper.module'
import {
  routedComponents,
  UsuarioPerfilOrganizacaoRoutingModule,
} from './usuario-perfil-organizacao-routing.module'
import { NeosAbstractListModule } from '../../../components/neos-abstract-list/neos-abstract-list.module';

@NgModule({
  imports: [
    CommonModule,
    UsuarioPerfilOrganizacaoRoutingModule,
    NeosAbstractListModule,
    FormWrapperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  declarations: [...routedComponents],
  exports: [],
})
export class UsuarioPerfilOrganizacaoModule {}
