import { Component } from '@angular/core';
import { AbstractDynamicFormArrayComponent } from '../abstract-dynamic-form-array/abstract-dynamic-form-array.component';
import { Cnpj } from '../../../models/cnpj.model';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cadastro-cnpj',
  templateUrl: './cadastro-cnpj.component.html',
  styleUrls: ['./cadastro-cnpj.component.scss'],
})
export class CadastroCnpjComponent extends AbstractDynamicFormArrayComponent<Cnpj> {
  entityName: string = 'cnpj';
  minLength: number = 1;
  maxLength: number = 50;

  createEntityFormGroup(): FormGroup {
    return this.fb.group({
      cnpjFornecedor: this.fb.control('', Validators.required),
    });
  }
}
