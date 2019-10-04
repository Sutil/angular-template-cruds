import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Resposta } from 'app/models/resposta.model';

import { Risco } from '../../../models/risco.enum';
import { AbstractDynamicFormArrayComponent } from '../abstract-dynamic-form-array/abstract-dynamic-form-array.component';
import { CriterioAnalise } from '../../../models/criterioanalise.model';

@Component({
  selector: 'cadastro-criterio',
  templateUrl: './cadastro-criterio.component.html',
  styleUrls: ['./cadastro-criterio.component.scss']
})
export class CadastroCriterioComponent extends AbstractDynamicFormArrayComponent<CriterioAnalise> {
  entityName: string = 'criterios';
  minLength: number = 1;
  maxLength = null;

  createEntityFormGroup(): FormGroup {
    return this.fb.group({
      nome: this.fb.control('', Validators.required),
      // resposta: this.fb.control('', Validators.required),
    });
  }
}