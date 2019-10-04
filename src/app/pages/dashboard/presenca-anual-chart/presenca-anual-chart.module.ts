import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresencaAnualChartComponent } from './presenca-anual-chart.component';
import { LineChartMdModule } from '../../../components/line-chart-md/line-chart-md.module';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LineChartMdModule,
    MatProgressSpinnerModule,
  ],
  declarations: [PresencaAnualChartComponent],
  exports: [PresencaAnualChartComponent],
})
export class PresencaAnualChartModule { }
