import { ConfirmacaoModalModule } from 'app/components/confirmacao-modal/confirmacao-modal.module';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatOptionModule, MatSelectModule } from '@angular/material'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { FormWrapperModule } from 'app/components/form-wrapper/form-wrapper.module'
import { EnumToArrayPipeModule } from 'app/enum-to-array'
import {
  RecursoRoutingModule,
  routedComponents,
} from './recurso-routing.module'
import { NeosAbstractListModule } from '../../../components/neos-abstract-list/neos-abstract-list.module';

@NgModule({
  imports: [
    CommonModule,
    RecursoRoutingModule,
    NeosAbstractListModule,
    ConfirmacaoModalModule,
    FormWrapperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    EnumToArrayPipeModule,
  ],
  declarations: [...routedComponents],
  exports: [],
})
export class RecursoModule {}
