import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSlideToggleModule,
  } from '@angular/material';
  
  import { CommonModule } from '@angular/common';
  import { InputFormatterModule } from 'app/input-formatter/input-formatter.module';
  import { NgModule } from '@angular/core';
  import { ReactiveFormsModule } from '@angular/forms';
  import { SearchClienteDialogComponent } from './search-cliente.component';

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatDialogModule,
      MatAutocompleteModule,
      MatInputModule,
      MatButtonModule,
    ],
    declarations: [SearchClienteDialogComponent],
    entryComponents: [SearchClienteDialogComponent],
    exports: [SearchClienteDialogComponent],
  })
  export class SearchClienteModule { }  