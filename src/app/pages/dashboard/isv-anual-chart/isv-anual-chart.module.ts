import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsvAnualChartComponent } from './isv-anual-chart.component';
import { LineChartMdModule } from '../../../components/line-chart-md/line-chart-md.module';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    LineChartMdModule,

  ],
  declarations: [IsvAnualChartComponent],
  exports: [IsvAnualChartComponent],
})
export class IsvAnualChartModule { }
