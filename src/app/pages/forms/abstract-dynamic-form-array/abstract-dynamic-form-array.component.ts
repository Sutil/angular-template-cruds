import { OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { BasicEntity } from '../../../models/base/basicentity.model';

export abstract class AbstractDynamicFormArrayComponent<T extends BasicEntity> implements OnInit {
  @Input()
  parentForm: FormGroup;

  entityFormArray: FormArray;

  abstract entityName: string;
  abstract minLength = 0;
  abstract maxLength = 0;

  constructor(@Inject(FormBuilder) protected fb: FormBuilder) {
    this.entityFormArray = this.fb.array([]);
    this.pushEntity();
  }

  abstract createEntityFormGroup(): FormGroup;

  public pushEntity(): void {
    if ((!this.maxLength) || (this.maxLength && this.maxLength >= this.minLength && this.entityFormArray.length < this.maxLength)) {
      this.entityFormArray.push(this.createEntityFormGroup());
    }
  }

  public popEntity(): void {
    if (this.minLength >= 0 && this.entityFormArray.length > this.minLength) {
      this.entityFormArray.removeAt(this.entityFormArray.length - 1);
    }
  }

  public removeAt(index: number) {
    if (this.minLength >= 0 && this.entityFormArray.length > this.minLength) {
      return this.entityFormArray.removeAt(index);
    }
  }

  ngOnInit() {
    if (!this.parentForm.get(this.entityName)) {
      this.parentForm.addControl(this.entityName, this.entityFormArray);
    } else if (!(this.parentForm.get(this.entityName) instanceof FormArray)) {
      this.parentForm.setControl(this.entityName, this.entityFormArray);
    } else {
      this.entityFormArray = <FormArray>this.parentForm.get(this.entityName);
    }
  }

  setFormArrayLength(l: number) {
    if (l < this.minLength) {
      l = this.minLength;
    }

    if (this.entityFormArray.length > l) {
      const diff = this.entityFormArray.length - l;
      for (let i = 0; i < diff; i++) {
        this.popEntity();
      }
    } else if (this.entityFormArray.length < l) {
      const diff = l - this.entityFormArray.length;
      for (let i = 0; i < diff; i++) {
        this.pushEntity();
      }
    }
  }
}
