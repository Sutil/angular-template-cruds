import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule, MatButtonModule, MatIconModule } from '@angular/material';
import { CardCounterComponent } from './card-counter.component';



@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        ],
    declarations: [CardCounterComponent],
    exports: [CardCounterComponent],
})
export class CardCounterModule {}
