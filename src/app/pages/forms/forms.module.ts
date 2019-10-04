import { FormsRoutingModule, routedComponents } from './forms-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EnumToArrayPipeModule } from '../../enum-to-array';
import { DynamicFormArrayWrapperModule } from '../../components/dynamic-form-array-wrapper/dynamic-form-array-wrapper.module';

@NgModule({
  imports: [
    CommonModule,
    FormsRoutingModule,
    DynamicFormArrayWrapperModule,
    EnumToArrayPipeModule
  ],
  entryComponents: [
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class FormsModule { }
