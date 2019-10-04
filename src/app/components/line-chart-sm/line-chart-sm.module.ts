import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LineChartSmComponent } from './line-chart-sm.component';
import { MatDividerModule, MatButtonModule, MatIconModule } from '@angular/material';



@NgModule({
    imports: [
        CommonModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        ],
    declarations: [LineChartSmComponent],
    exports: [LineChartSmComponent],
})
export class LineChartSmModule {}
