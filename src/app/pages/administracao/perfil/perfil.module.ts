import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatCheckboxModule } from '@angular/material'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'
import { ConfirmacaoModalModule } from 'app/components/confirmacao-modal/confirmacao-modal.module'
import { FormWrapperModule } from 'app/components/form-wrapper/form-wrapper.module'
import { AssociacaoWrapperComponent } from 'app/pages/tabela-associacao/associacao-wrapper.component'
import { PerfilRoutingModule, routedComponents } from './perfil-routing.module'
import { NeosAbstractListModule } from '../../../components/neos-abstract-list/neos-abstract-list.module';

@NgModule({
  imports: [
    CommonModule,
    PerfilRoutingModule,
    NeosAbstractListModule,
    FormWrapperModule,
    ConfirmacaoModalModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatCheckboxModule,
  ],
  declarations: [...routedComponents, AssociacaoWrapperComponent],
  exports: [],
})
export class PerfilModule {}
