import { Directive, ElementRef, forwardRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { MaskDirective, MaskService } from 'ngx-mask';
import {DOCUMENT} from '@angular/common';
import { Inject } from "@angular/core";

/**
 * Diretiva que extende o MaskDirective com uma expressão própria
 * serve como "apelido" de mask="00.000.000/0000-00"
 */
@Directive({
  selector: 'input[cnpj]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CnpjFormatterDirective),
      multi: true,
    },
    MaskService,
  ],
})
export class CnpjFormatterDirective extends MaskDirective {
  constructor( @Inject(DOCUMENT) doc, _maskService: MaskService) {
    super(doc, _maskService);
    this.maskExpression = '00.000.000/0000-00';
  }
}




const _INVALIDCNPJ = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
];


function digitoVerificador(numbers: string): number {
  let index = 2;
  const reverse = numbers.split('').reduce(
      (buffer, number) => [parseInt(number, 10)].concat(buffer),
      []);

  const sum = reverse.reduce((buffer, number) => {
      buffer += number * index;
      index = (index === 9 ? 2 : index + 1);
      return buffer;
  }, 0);

  const mod = sum % 11;
  return (mod < 2 ? 0 : 11 - mod);
}

function validCnpj(cnpj: string): boolean {
  if (!cnpj) { return false; }
  cnpj = cnpj.toString().replace(/[-\/.]/g, '');

  if (cnpj.length !== 14) { return false; }
  if (_INVALIDCNPJ.indexOf(cnpj) >= 0) { return false; }

  let numbers: string = cnpj.substr(0, 12);
  numbers = numbers + digitoVerificador(numbers);
  numbers = numbers + digitoVerificador(numbers);
  return numbers.substr(-2) === cnpj.substr(-2);
}

function CnpjValidator(c: AbstractControl): ValidationErrors | null {
  const value = c.value;
  if (value && !validCnpj(value)) {
      return { 'cnpj': true };
  }
  return null;
}



@Directive({
  selector: 'input[cnpj][formControlName],input[cnpj][formControl],input[cnpj][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CnpjValidatorDirective),
      multi: true,
    },
  ],
})
export class CnpjValidatorDirective implements Validator, OnChanges {
  private _onChange: () => void;

  ngOnChanges(changes: SimpleChanges): void {
    if ('cnpj' in changes) {
      if (this._onChange) { this._onChange(); }
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return CnpjValidator(c);
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
}
