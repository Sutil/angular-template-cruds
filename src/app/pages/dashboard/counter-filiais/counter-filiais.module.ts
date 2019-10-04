import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterFiliaisComponent } from './counter-filiais.component';
import { CardCounterModule } from '../../../components/card-counter/card-counter.module';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    CardCounterModule,
  ],
  declarations: [CounterFiliaisComponent],
  exports: [CounterFiliaisComponent]
})
export class CounterFiliaisModule { }
