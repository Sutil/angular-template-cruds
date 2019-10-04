import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardIconUpdatableComponent } from './card-icon-updatable.component';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [CardIconUpdatableComponent],
  exports: [CardIconUpdatableComponent],
})
export class CardIconUpdatableModule { }
