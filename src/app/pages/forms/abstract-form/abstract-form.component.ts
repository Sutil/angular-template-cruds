import { Component, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'wtc-form',
  templateUrl: './abstract-form.component.html',
  styleUrls: ['./abstract-form.component.scss'],
})
export class AbstractFormComponent {
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
