import { Component, OnInit } from '@angular/core';
import { HorasTrabalhadasService } from './horas-trabalhadas.service';

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
  selector: 'horas-trabalhadas-chart',
  templateUrl: './horas-trabalhadas-chart.component.html',
  styleUrls: ['./horas-trabalhadas-chart.component.scss']
})
export class HorasTrabalhadasChartComponent implements OnInit {

  loading = true;

  horas = {
    labels: [],
    series: [],
  };

  constructor(private service: HorasTrabalhadasService) { }

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

      this.horas.labels = dados.map(dado => semana[new Date(dado.data).getDay()]);
      this.horas.series = [];
      const horasTrabalhadas = dados.map(dado => dado.horasTrabalhadas);
      const horasFaltosas = dados.map(dado => dado.horasEsperadas - dado.horasTrabalhadas);

      this.horas.series.push(horasTrabalhadas);
      this.horas.series.push(horasFaltosas);
     } catch (error) {
      this.horas.labels = [];
      this.horas.series = [];
     }
     finally {
       this.loading = false;
     }

  }

}
