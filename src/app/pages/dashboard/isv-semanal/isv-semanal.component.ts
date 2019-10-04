import { Component, OnInit } from '@angular/core';
import { IsvSemanalService } from './isv-semanal.service';

const semana = {
  0: 'D',
  1: 'S',
  2: 'T',
  3: 'Q',
  4: 'Q',
  5: 'S',
  6: 'S',
}

@Component({
  selector: 'isv-semanal',
  templateUrl: './isv-semanal.component.html',
  styleUrls: ['./isv-semanal.component.scss']
})
export class IsvSemanalComponent implements OnInit {

  isvs = {
    labels: [],
    series: [],
  }

  loading: boolean;

  constructor(private service: IsvSemanalService) { }

  ngOnInit() {
    this.readValue();
  }

  update() {
    this.readValue();
  }

  async readValue() {
    this.loading = true;
    try {
      const dados = await this.service.getData();

      this.isvs.labels = dados.map(dado => semana[new Date(dado.data).getDay()])
      this.isvs.series = [];
      this.isvs.series.push(dados.map(dado => dado.qtdeSku));
      this.isvs.series.push(dados.map(dado => dado.qtdeIsv));
    } catch (error) {
      this.isvs.labels = [];
      this.isvs.series = [];
    }
    finally {
      this.loading = false;
    }
  }

}
