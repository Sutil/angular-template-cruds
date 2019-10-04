import { Component, AfterViewInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import * as Chartist from 'chartist';
@Component({
  selector: 'line-chart-sm',
  templateUrl: './line-chart-sm.component.html',
  styleUrls: ['./line-chart-sm.component.scss']
})
export class LineChartSmComponent implements AfterViewInit {
  @Input()
  idChart;

  @Input()
  backgroundColor: 'yellow' | 'green' | 'rose' | 'blue' = 'blue';

  @Input()
  data: { labels: string[]; series: any[] };

  @Input()
  title: string;

  @Input()
  description: string

  @Output()
  updateEvent: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngAfterViewInit() {
    this.makeChart();
  }

  makeChart() {
    if (!this.idChart) {
      throw new Error('Identificador do gráfico não foi informado.');
    }

    const dataRoundedLineChart = this.data;

    const optionsRoundedLineChart: Chartist.ILineChartOptions = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: this.getTopValueForGraphic(),
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
      showPoint: true,
      showLine: true,
      showArea: true,
      classNames: {
        line: 'ct-line ct-line-chart',
        point: 'ct-point ct-point-chart',
        label: 'ct-label ct-label-chart',
        grid: 'ct-grid ct-grid-chart',
      },
    };

    const theChart = new Chartist.Line(
      '#' + this.idChart,
      dataRoundedLineChart,
      optionsRoundedLineChart,
    );

    this.startAnimationForLineChart(theChart);
  }

  getTopValueForGraphic () {
    let maxValue = 0;
    const series = this.data.series;
    for (const arr of series) {
      for (const value of arr) {
        if (value > maxValue) {
          maxValue = value;
        }
      }
    }
    return maxValue + 2;
  }

  startAnimationForLineChart(chart) {
    let seq, delays, durations;
    seq = 0;
    delays = 80;
    durations = 500;
    chart.on('draw', function(data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease',
          }
        });
      }
    });

    seq = 0;
  }

  update() {
    this.updateEvent.emit();
  }
}
