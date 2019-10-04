import { Component, OnInit } from '@angular/core';
import { AbstractDynamicFormArrayComponent } from '../abstract-dynamic-form-array/abstract-dynamic-form-array.component';
import { Telefone } from '../../../models/telefone.model';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cadastro-telefone',
  templateUrl: './cadastro-telefone.component.html',
  styleUrls: ['./cadastro-telefone.component.scss']
})
export class CadastroTelefoneComponent extends AbstractDynamicFormArrayComponent<Telefone> {
  entityName: string = 'telefones';
  minLength: number = 0;
  maxLength: number = 3;

  createEntityFormGroup(): FormGroup {
    return this.fb.group({
      descricao: this.fb.control('', Validators.required),
      ddd: this.fb.control('', Validators.required),
      telefone: this.fb.control('', Validators.required),
      ramal: this.fb.control(''),
    });
  }
}