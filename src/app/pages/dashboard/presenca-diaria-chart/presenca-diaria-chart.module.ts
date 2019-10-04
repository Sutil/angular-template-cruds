import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresencaDiariaChartComponent } from './presenca-diaria-chart.component';
import { DonutChartSmModule } from '../../../components/donut-chart-sm/donut-chart-sm.module';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DonutChartSmModule,
    MatProgressSpinnerModule,
  ],
  declarations: [PresencaDiariaChartComponent],
  exports: [PresencaDiariaChartComponent],

})
export class PresencaDiariaChartModule { }
