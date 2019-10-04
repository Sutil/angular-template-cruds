import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartMdComponent } from './line-chart-md.component';
import { CardIconUpdatableModule } from '../card-icon-updatable/card-icon-updatable.module';

@NgModule({
  imports: [
    CommonModule,
    CardIconUpdatableModule,
  ],
  declarations: [LineChartMdComponent],
  exports: [LineChartMdComponent],
})
export class LineChartMdModule { }
