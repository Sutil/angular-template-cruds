import { NgModule } from '@angular/core'
import {
  AdministracaoRoutingModule,
  routedComponents,
} from './administracao-routing.module'

@NgModule({
  imports: [AdministracaoRoutingModule],
  declarations: [...routedComponents],
  exports: [],
})
export class AdministracaoModule {}
