import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterPromotoresComponent } from './counter-promotores.component';
import { CardCounterModule } from '../../../components/card-counter/card-counter.module';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    CardCounterModule,
  ],
  declarations: [CounterPromotoresComponent],
  exports: [CounterPromotoresComponent],
})
export class CounterPromotoresModule { }
