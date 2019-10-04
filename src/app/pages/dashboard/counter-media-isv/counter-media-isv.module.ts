import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterMediaISVComponent } from './counter-media-isv.component';
import { CardCounterModule } from '../../../components/card-counter/card-counter.module';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CardCounterModule,
    MatProgressSpinnerModule,
  ],
  declarations: [CounterMediaISVComponent],
  exports: [CounterMediaISVComponent]
})
export class CounterMediaISVModule { }
