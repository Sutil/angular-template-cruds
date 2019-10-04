import { NeosAbstractListModule } from './../../../components/neos-abstract-list/neos-abstract-list.module';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
} from '@angular/material'
import { FormWrapperModule } from 'app/components/form-wrapper/form-wrapper.module'
import { InputFormatterModule } from 'app/input-formatter/input-formatter.module'
import {
  EmpresaRoutingModule,
  routedComponents,
} from './empresa-routing.module'

@NgModule({
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    NeosAbstractListModule,
    FormWrapperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    InputFormatterModule,
  ],
  declarations: [...routedComponents],
  exports: [],
})
export class EmpresaModule {}
