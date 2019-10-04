import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core'
import * as Chartist from 'chartist'

@Component({
  selector: 'line-chart-md',
  templateUrl: './line-chart-md.component.html',
  styleUrls: ['./line-chart-md.component.scss'],
})
export class LineChartMdComponent implements AfterViewInit {
  @Input()
  idChart: string

  @Input()
  icon: string

  @Input()
  title: string

  @Input()
  data: {
    labels: string[]
    series: any[]
    legendas?: { legenda: string; cor: 'green'; red }[]
  }

  @Input()
  color: 'green' | 'red' | 'blue' | 'yellow' = 'green'

  @Output()
  update: EventEmitter<void> = new EventEmitter()

  constructor() {}

  ngAfterViewInit() {
    const chart = new Chartist.Line('#' + this.idChart, this.data, {
      showArea: true,
      classNames: {
        horizontal: 'ct-label ct-horizontal ct-end ct-label-rotate',
        grid: 'ct-grid ct-horizontal ct-md',
        line: 'ct-line ' + this.color,
      },
      showPoint: false,
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
    });

    this.trataLabels();

    this.startAnimationForLineChart(chart);
  }

  trataLabels() {
    if (this.data.labels.length < 15) {
      return;
    }

    this.data.labels = this.data.labels.map((value, index) => {
      if (index % 2) {
        return '';
      }
      return value;
    });
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

  updateClicked() {
    this.update.emit()
  }
}
