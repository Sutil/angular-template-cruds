import { CommonModule } from '@angular/common';
import { DynamicFormArrayWrapperComponent } from './dynamic-form-array-wrapper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

const MATERIAL_MODULES = [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
];
@NgModule({
    imports: [CommonModule,
        ReactiveFormsModule,
        ...MATERIAL_MODULES],
    declarations: [DynamicFormArrayWrapperComponent],
    exports: [DynamicFormArrayWrapperComponent, ReactiveFormsModule],
})
export class DynamicFormArrayWrapperModule { }
