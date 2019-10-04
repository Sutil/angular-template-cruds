import { Component, OnInit, Input } from '@angular/core';
import { PresencaDiariaService } from './presenca-diaria.service';

@Component({
  selector: 'presenca-diaria-chart',
  templateUrl: './presenca-diaria-chart.component.html',
  styleUrls: ['./presenca-diaria-chart.component.scss']
})
export class PresencaDiariaChartComponent implements OnInit {

  @Input()
  day: 'hoje' | 'ontem' = 'hoje';

  @Input()
  idChart: string = 'presenca-diaria-chart';

  @Input()
  tooltipDescription: string = 'Percentual de presença';

  loading: boolean;

  data: number[] = [];

  constructor(private service: PresencaDiariaService) { }

  ngOnInit() {
    this.loadValue();
  }

  update() {
    this.loadValue();
  }

  async loadValue() {
    this.loading = true;

    try {
      const data = await this.service.getData(this.day);

      this.data = [];
      const totalPresenca: number = data.map(dado => dado.presencas).reduce((sum, current) => sum + current);
      const totalFaltas: number = data.map(dado => dado.faltas).reduce((sum, current) => sum + current);

      this.data.push(totalPresenca);
      this.data.push(totalFaltas);
    } catch (error) {
      this.data = [];
    } finally {
      this.loading = false
    }
  }

}
