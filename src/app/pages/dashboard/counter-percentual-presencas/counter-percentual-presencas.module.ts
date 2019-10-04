import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterPercentualPresencasComponent } from './counter-percentual-presencas.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { CardCounterModule } from '../../../components/card-counter/card-counter.module';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    CardCounterModule,
  ],
  declarations: [CounterPercentualPresencasComponent],
  exports: [CounterPercentualPresencasComponent],
})
export class CounterPercentualPresencasModule { }
