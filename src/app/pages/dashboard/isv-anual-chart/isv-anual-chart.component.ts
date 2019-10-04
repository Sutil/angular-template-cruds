import { Component, OnInit } from '@angular/core';
import { IsvSemanalService } from '../isv-semanal/isv-semanal.service';
import { ChartUtil } from '../chart.util';

@Component({
  selector: 'isv-anual-chart',
  templateUrl: './isv-anual-chart.component.html',
  styleUrls: ['./isv-anual-chart.component.scss']
})
export class IsvAnualChartComponent implements OnInit {

  loading: boolean;

  data = {
    labels: [],
    series: [],
    legendas: [],
  }

  constructor(private service: IsvSemanalService) { }

  ngOnInit() {
    this.loadData();
  }

  update() {
    this.loadData();
  }

  async loadData() {
    this.loading = true;

    try {
      const data = await this.service.getDataAnual();

      const meses = data.map(dado => dado.data);
      const labels = ChartUtil.longToLabelMonthYear(meses);
      this.data.labels = labels;

      const sku = data.map(dado => dado.qtdeSku);
      const isv = data.map(dado => dado.qtdeIsv);

      this.data.series = [];
      this.data.series.push(sku);
      this.data.series.push(isv);

      this.data.legendas = [
        {legenda: 'SKU', cor: 'yellow'},
        {legenda: 'ISV', cor: 'red'},
      ];

    } catch (error) {
      this.data.labels = [];
      this.data.series = [];
    } finally {
      this.loading = false;
    }
  }

}
