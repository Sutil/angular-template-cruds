import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresencaMensalChartComponent } from './presenca-mensal-chart.component';
import { LineChartMdModule } from '../../../components/line-chart-md/line-chart-md.module';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LineChartMdModule,
    MatProgressSpinnerModule,
  ],
  declarations: [PresencaMensalChartComponent],
  exports: [PresencaMensalChartComponent],
})
export class PresencaMensalChartModule { }
