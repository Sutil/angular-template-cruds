import { Directive, ElementRef, forwardRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { MaskDirective, MaskService } from 'ngx-mask';

import {DOCUMENT} from '@angular/common';
import { Inject } from "@angular/core";

/**
 * Diretiva que extende o MaskDirective com uma expressão própria
 * serve como "apelido" de mask="000.000.000-00"
 */
@Directive({
  selector: 'input[cpf]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CpfFormatterDirective),
      multi: true,
    },
    MaskService,
  ],
})
export class CpfFormatterDirective extends MaskDirective {
  constructor( @Inject(DOCUMENT) doc, _maskService: MaskService) {
    super(doc, _maskService);
    this.maskExpression = '000.000.000-00';
  }
}

const _INVALIDCPF = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
  '12345678909',
];

function digitoVerificador(numbers: string): number {
  const numberArray = numbers.split('').map((number) => parseInt(number, 10));
  const modulus = numbers.length + 1;
  const multiplied = numberArray.map((number, index) => number * (modulus - index));
  const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;
  return (mod < 2 ? 0 : 11 - mod);
}

function validCpf(cpf: string): boolean {
  if (!cpf) { return false; }
  cpf = cpf.toString().replace(/[-\/.]/g, '');
  if (cpf.length !== 11) { return false; }
  if (_INVALIDCPF.indexOf(cpf) >= 0) { return false; }
  let numbers: string = cpf.substr(0, 9);
  numbers = numbers + digitoVerificador(numbers);
  numbers = numbers + digitoVerificador(numbers);
  return numbers.substr(-2) === cpf.substr(-2);
}

function CpfValidator(c: AbstractControl): ValidationErrors | null {
  const value = c.value;
  if (value && !validCpf(value)) {
      return { 'cpf': true };
  }
  return null;
}

@Directive({
  selector: 'input[cpf][formControlName],input[cpf][formControl],input[cpf][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CpfValidatorDirective),
      multi: true,
    },
  ],
})
export class CpfValidatorDirective implements Validator, OnChanges {
  private _onChange: () => void;

  ngOnChanges(changes: SimpleChanges): void {
    if ('cpf' in changes) {
      if (this._onChange) { this._onChange(); }
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return CpfValidator(c);
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
}
