import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutChartSmComponent } from './donut-chart-sm.component';
import { MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  declarations: [DonutChartSmComponent],
  exports: [DonutChartSmComponent],
})
export class DonutChartSmModule { }
