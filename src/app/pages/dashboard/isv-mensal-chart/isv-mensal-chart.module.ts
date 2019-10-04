import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsvMensalChartComponent } from './isv-mensal-chart.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { LineChartMdModule } from '../../../components/line-chart-md/line-chart-md.module';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    LineChartMdModule,
  ],
  declarations: [IsvMensalChartComponent],
  exports: [IsvMensalChartComponent],
})
export class IsvMensalChartModule { }
