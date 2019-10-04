import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { ListWrapperPaginatorComponent } from './list-wrapper-paginator.component';

export const MATERIAL_MODULES = [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
];

@NgModule({
    imports: [CommonModule, ...MATERIAL_MODULES],
    declarations: [ListWrapperPaginatorComponent],
    entryComponents: [],
    exports: [ListWrapperPaginatorComponent],
})
export class ListWrapperPaginatorModule { }
