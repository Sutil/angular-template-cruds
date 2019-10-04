import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, NgZone } from '@angular/core';
import * as Chartist from 'chartist';


@Component({
  selector: 'donut-chart-sm',
  templateUrl: './donut-chart-sm.component.html',
  styleUrls: ['./donut-chart-sm.component.scss']
})
export class DonutChartSmComponent implements AfterViewInit {

  @Input()
  idChart: string;

  private _data: number [];

  @Input()
  set data(value: any) {
    if (value instanceof Array) {
      this._data = value;
      this.total = this._data.sum();
    }
  }

  @Input()
  labels: string[] = []

  @Input()
  backgroundColor: 'green' | 'red' | 'rose' | 'blue' | 'yellow' | 'orange' = 'green';

  @Input()
  title: string;

  @Input()
  description: string;

  @Input()
  tooltipDescription: string;

  @Output()
  update: EventEmitter<void> = new EventEmitter();

  total: number;

  constructor(private zone: NgZone) {

  }

  ngAfterViewInit() {
    const chart = new Chartist.Pie('#' + this.idChart,
    {
      series: this._data,
      labels: this.labels,
    }, {
      donut: true,
      donutWidth: 30,
      donutSolid: true,
      startAngle: 270,
      showLabel: true,
      ignoreEmptyValues: true,
    });
  }

  updateClicked() {
    this.update.emit();
  }

}
