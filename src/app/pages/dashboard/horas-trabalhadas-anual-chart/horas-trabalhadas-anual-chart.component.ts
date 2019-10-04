import { ChartUtil } from './../chart.util';
import { Component, OnInit, Input } from '@angular/core';
import { HorasTrabalhadasService } from '../horas-trabalhadas-chart/horas-trabalhadas.service';

@Component({
  selector: 'horas-trabalhadas-anual-chart',
  templateUrl: './horas-trabalhadas-anual-chart.component.html',
  styleUrls: ['./horas-trabalhadas-anual-chart.component.scss']
})
export class HorasTrabalhadasAnualChartComponent implements OnInit {

  @Input()
  set periodo(value: 'ano' | 'mes' ) {
    if (value) {
      this.period = value
    } else {
      this.period = 'ano'
    }
  }

  period: string;


  get idChart(): string {
    if (!this.period) {
      return 'horasTrabalhadasChart';
    }

    return 'horasTrabalhadasChart' + this.period;
  }


  loading: boolean;

  data: {
    labels: string[],
    series: any[],
    legendas?: {legenda: string, cor: string}[],
  } = {
    labels: [],
    series: [],
    legendas: [],
  }

  constructor(private service: HorasTrabalhadasService) { }

  ngOnInit() {
    if (!this.period) {
      this.period = 'ano';
    }
    this.loadData();
  }

  update() {
    this.loadData();
  }

  async loadData() {
    this.loading = true;
    try {
      const data = await this.service.getDadosPeriodo(this.period);

      const dias = data.map(dado => dado.data);

      if (this.period === 'ano') {
        this.data.labels = ChartUtil.longToLabelMonthYear(dias);
      } else {
        this.data.labels = ChartUtil.longToLabelDayMonth(dias);
      }

      const horasFaltosas = data.map(dado => dado.horasEsperadas - dado.horasTrabalhadas);
      const horasTrabalhadas = data.map(dado => dado.horasTrabalhadas);

      this.data.series = [];
      this.data.series.push(horasTrabalhadas);
      this.data.series.push(horasFaltosas);

      this.data.legendas = [
        {legenda: 'Horas Trabalhadas', cor: 'blue'},
        {legenda: 'Horas Faltosas', cor: 'red'},
      ];
    } catch (error) {
        this.data.labels = [];
        this.data.series = [];
    }
    finally {
      this.loading = false;
    }

  }

}
