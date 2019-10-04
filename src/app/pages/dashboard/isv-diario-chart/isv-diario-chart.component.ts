import { Component, OnInit, Input } from '@angular/core';
import { IsvDiarioChartService } from './isv-diario-chart.service';

@Component({
  selector: 'isv-diario-chart',
  templateUrl: './isv-diario-chart.component.html',
  styleUrls: ['./isv-diario-chart.component.scss']
})
export class IsvDiarioChartComponent implements OnInit {

  constructor(private service: IsvDiarioChartService) { }

  @Input()
  day: 'hoje' | 'ontem' = 'hoje';

  @Input()
  idChart: string = 'isv-diario-chart'

  data = [10, 20];

  loading: boolean;

  ngOnInit() {
    this.loadValues();
  }

  update() {
    this.loadValues();
  }

  async loadValues() {
    this.loading = true;

    try {
      const data = await this.service.getData(this.day);
      const totalISV = data.map(dado => dado.qtdeIsv).reduce((sum, current) => sum + current);
      const totalSku = data.map(dado => dado.qtdeSku).reduce((sum, current) => sum + current);
      const itensVendidos = totalSku - totalISV;

      this.data = [];
      this.data.push(totalISV);
      this.data.push(itensVendidos);
    } catch (error) {
      this.data = [];
    } finally {
      this.loading = false;
    }

  }

}
