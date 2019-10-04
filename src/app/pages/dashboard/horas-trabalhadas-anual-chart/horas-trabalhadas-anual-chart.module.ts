import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorasTrabalhadasAnualChartComponent } from './horas-trabalhadas-anual-chart.component';
import { LineChartMdModule } from '../../../components/line-chart-md/line-chart-md.module';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    LineChartMdModule,
  ],
  declarations: [HorasTrabalhadasAnualChartComponent],
  exports: [HorasTrabalhadasAnualChartComponent],
})
export class HorasTrabalhadasAnualChartModule { }
