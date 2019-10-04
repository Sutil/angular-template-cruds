import { NeosAbstractListModule } from './../../../components/neos-abstract-list/neos-abstract-list.module';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSnackBarModule,
} from '@angular/material'
import { FormWrapperModule } from './../../../components/form-wrapper/form-wrapper.module'
import { cnpjRoutedComponents, CnpjRoutingModule } from './cnpj-routin.module'

@NgModule({
  imports: [
    CommonModule,
    CnpjRoutingModule,
    NeosAbstractListModule,
    FormWrapperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatOptionModule,
  ],
  declarations: [...cnpjRoutedComponents],
})
export class CnpjModule {}
