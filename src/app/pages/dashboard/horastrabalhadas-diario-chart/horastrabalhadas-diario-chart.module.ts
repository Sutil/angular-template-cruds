import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorastrabalhadasDiarioChartComponent } from './horastrabalhadas-diario-chart.component';
import { DonutChartSmModule } from '../../../components/donut-chart-sm/donut-chart-sm.module';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DonutChartSmModule,
    MatProgressSpinnerModule,
  ],
  declarations: [HorastrabalhadasDiarioChartComponent],
  exports: [HorastrabalhadasDiarioChartComponent],
})
export class HorastrabalhadasDiarioChartModule { }
