
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'form-wrapper',
    templateUrl: './form-wrapper.component.html',
    styleUrls: ['./form-wrapper.component.scss'],
})
export class FormWrapperComponent {
    @Input()
    formTitle: string;

    @Input()
    component: any;

    public loading: boolean = false;

    get entityForm(): FormGroup { return this.component.entityForm; }

    get submitButtonText(): string { return this.component.submitButtonText; }

    _internalSubmit() {
        this.component.onSubmit();
    }

    voltar() {
        this.component.voltar();
    }
}
