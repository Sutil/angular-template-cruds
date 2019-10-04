import { NgModule } from '@angular/core';

import { CadastrosRoutingModule, routedComponents } from './cadastros-routing.module';

@NgModule({
  imports: [CadastrosRoutingModule],
  declarations: [...routedComponents],
  exports: [],
})
export class CadastrosModule { }
