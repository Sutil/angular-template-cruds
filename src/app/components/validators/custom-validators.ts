import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export namespace CustomValidators {
    export function required(c: AbstractControl): ValidationErrors | null {
        return (c.value === null || c.value === undefined) ? { required: true } : null;
    }

    export function numberGreater(val: number): ValidatorFn {
        return function (c: AbstractControl): ValidationErrors | null {
            const value = Number(c.value);
            return (value && !Number.isNaN(value) && Number.isFinite(value) && value > val) ?
                null :
                { greater: true };
        };
    }

    export function minLengthArray(min: number): ValidatorFn {
        return function (c: AbstractControl): ValidationErrors | null {
            if (c.value.length >= min) {
                return null;
            }

            return { smaller: true };
        }
    }
}