import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule, MatButtonModule, MatIconModule } from '@angular/material';
import { StackedBarChartComponent } from './stacked-bar-chart.component';



@NgModule({
    imports: [
        CommonModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        ],
    declarations: [StackedBarChartComponent],
    exports: [StackedBarChartComponent],
})
export class StackedBarChartModule {}
