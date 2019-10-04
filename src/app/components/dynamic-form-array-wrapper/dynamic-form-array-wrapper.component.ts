import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'dynamic-form-array-wrapper',
  templateUrl: './dynamic-form-array-wrapper.component.html',
  styleUrls: ['./dynamic-form-array-wrapper.component.scss']
})
export class DynamicFormArrayWrapperComponent {
  @Input()
  formArrayTitle: string;

  @Input()
  formArrayIcon: string;

  @Input()
  formGroup: FormGroup;

  @Input() 
  removeButton: boolean;

  @Output()
  onAddButtonClick: EventEmitter<void> = new EventEmitter();

  @Output()
  onRemoveButtonClick: EventEmitter<void> = new EventEmitter();

  adicionar() {
    this.onAddButtonClick.emit();
  }

  remover() {
    this.onRemoveButtonClick.emit();
  }
}