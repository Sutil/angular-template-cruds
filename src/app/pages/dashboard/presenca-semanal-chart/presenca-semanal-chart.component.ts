import { Component, OnInit } from '@angular/core';
import { PresencaSemanalService } from './presenca-semanal.service';

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
  selector: 'presenca-semanal-chart',
  templateUrl: './presenca-semanal-chart.component.html',
  styleUrls: ['./presenca-semanal-chart.component.scss'],
})
export class PresencaSemanalChartComponent implements OnInit {

  loading = true;

  presenca = {
    labels: [],
    series: [],
  };

  constructor(private service: PresencaSemanalService) { }

  ngOnInit() {
    this.carregaDados();
  }

  update() {
    this.carregaDados();
  }

  async carregaDados() {
    this.loading = true;

    try {
      const dados = await this.service.getData();
      this.presenca.series = [];
      this.presenca.labels = dados.map(dado => semana[new Date(dado.data).getDay()])

      const presencas = dados.map(dado => dado.presencas);
      const faltas = dados.map(dado => dado.faltas)

      this.presenca.series.push(presencas);
      this.presenca.series.push(faltas);
    } catch (error) {
      this.presenca.series = [];
      this.presenca.labels = [];
    } finally {
      this.loading = false;
    }

  }


}
