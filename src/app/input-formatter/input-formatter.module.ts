import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import { CnpjFormatterDirective, CnpjValidatorDirective } from './cnpj.directive';
import { CpfFormatterDirective, CpfValidatorDirective } from './cpf.directive';

const CPF_DIRECTIVES = [CpfFormatterDirective, CpfValidatorDirective];
const CNPJ_DIRECTIVES = [CnpjFormatterDirective, CnpjValidatorDirective];

@NgModule({
  imports: [NgxMaskModule.forRoot()],
  declarations: [...CPF_DIRECTIVES, ...CNPJ_DIRECTIVES],
  exports: [...CPF_DIRECTIVES, ...CNPJ_DIRECTIVES],
})
export class InputFormatterModule { }
