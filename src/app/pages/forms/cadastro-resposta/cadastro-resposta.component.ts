import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Resposta } from 'app/models/resposta.model';

import { Risco } from '../../../models/risco.enum';
import { AbstractDynamicFormArrayComponent } from '../abstract-dynamic-form-array/abstract-dynamic-form-array.component';

@Component({
  selector: 'cadastro-resposta',
  templateUrl: './cadastro-resposta.component.html',
  styleUrls: ['./cadastro-resposta.component.scss']
})
export class CadastroRespostaComponent extends AbstractDynamicFormArrayComponent<Resposta> {
  entityName: string = 'respostas';
  minLength: number = 1;
  maxLength = null;
  riscos = Risco;

  createEntityFormGroup(): FormGroup {
    return this.fb.group({
      descricao: this.fb.control('', Validators.required),
      risco: this.fb.control(null, Validators.required)
    });
  }
}
