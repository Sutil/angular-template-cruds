import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { FormWrapperModule } from 'app/components/form-wrapper/form-wrapper.module'
import { EnumToArrayPipeModule } from 'app/enum-to-array'
import { DynamicFormArrayWrapperModule } from '../../../components/dynamic-form-array-wrapper/dynamic-form-array-wrapper.module'
import { CadastroCnpjComponent } from '../../forms/cadastro-cnpj/cadastro-cnpj.component'
import { CadastroTelefoneComponent } from '../../forms/cadastro-telefone/cadastro-telefone.component'
import {
  routedComponents,
  UsuarioRoutingModule,
} from './usuario-routing.module'
import { NeosAbstractListModule } from '../../../components/neos-abstract-list/neos-abstract-list.module';

@NgModule({
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    NeosAbstractListModule,
    FormWrapperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    EnumToArrayPipeModule,
    MatIconModule,
    MatCardModule,
    DynamicFormArrayWrapperModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatListModule,
  ],
  declarations: [
    ...routedComponents,
    CadastroTelefoneComponent,
    CadastroCnpjComponent,
  ],
  exports: [],
})
export class UsuarioModule {}
