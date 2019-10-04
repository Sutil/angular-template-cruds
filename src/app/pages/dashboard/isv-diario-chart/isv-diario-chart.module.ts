import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsvDiarioChartComponent } from './isv-diario-chart.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { DonutChartSmModule } from '../../../components/donut-chart-sm/donut-chart-sm.module';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    DonutChartSmModule,
  ],
  declarations: [IsvDiarioChartComponent],
  exports: [IsvDiarioChartComponent],
})
export class IsvDiarioChartModule { }
