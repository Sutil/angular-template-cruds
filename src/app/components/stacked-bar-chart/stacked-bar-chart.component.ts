import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss']
})
export class StackedBarChartComponent implements AfterViewInit {

  @Input()
  idChart: string;

  @Input()
  title: string;

  @Input()
  description: string;

  @Input()
  backgroundColor: 'blue' | 'yellow' | 'rose' | 'green';

  @Input()
  data: {
    labels: any[],
    series: any[],
  };

  @Output()
  update: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngAfterViewInit() {

    const options: Chartist.IBarChartOptions = {
      stackBars: true,
    };

    const theChart = new Chartist.Bar(
      '#' + this.idChart,
      this.data,
      options,
    )

    this.startAnimationForBarChart(theChart);

  }

  startAnimationForBarChart(chart){
    let seq2, delays2, durations2;
    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function(data) {
      if (data.type === 'bar') {
          seq2++;
          data.element.animate({
            opacity: {
              begin: seq2 * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease',
            }
          });
      }
    });
    seq2 = 0;
  }

  updateChart() {
    this.update.emit()
  }

}
