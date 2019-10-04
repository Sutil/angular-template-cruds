import { NeosAbstractListModule } from './../../../components/neos-abstract-list/neos-abstract-list.module';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { FormWrapperModule } from 'app/components/form-wrapper/form-wrapper.module'
import { EnumToArrayPipeModule } from 'app/enum-to-array'
import {
  DivisaoRoutingModule,
  routedComponents,
} from './divisao-routing.module'

@NgModule({
  imports: [
    CommonModule,
    DivisaoRoutingModule,
    NeosAbstractListModule,
    FormWrapperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    EnumToArrayPipeModule,
  ],
  declarations: [...routedComponents],
  exports: [],
})
export class DivisaoModule {}
