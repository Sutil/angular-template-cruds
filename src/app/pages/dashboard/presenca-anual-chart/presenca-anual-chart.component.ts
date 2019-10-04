import { Component, OnInit } from '@angular/core';
import { PresencaMensalService } from '../presenca-mensal-chart/presenca-mensal.service';


const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
];

@Component({
  selector: 'presenca-anual-chart',
  templateUrl: './presenca-anual-chart.component.html',
  styleUrls: ['./presenca-anual-chart.component.scss'],
})
export class PresencaAnualChartComponent implements OnInit {

  loading: boolean;

  data = {
    labels: [],
    series: [],
    legendas: [],
  }

  constructor(private service: PresencaMensalService) { }

  ngOnInit() {
    this.loadData();
  }

  update() {
    this.loadData();
  }

async loadData() {
  this.loading = true;

  try {
    const data = await this.service.getDataAno();

    this.data.labels = data.map(dado => {
      const dia = new Date(dado.data);
      return `${monthNames[dia.getMonth()]}/${dia.getFullYear()}`
    })

    this.data.series = [];

    this.data.series.push(data.map(dado => dado.presencas));
    this.data.series.push(data.map(dado => dado.faltas));

    this.data.legendas = [
      {legenda: 'Presenças', cor: 'green'},
      {legenda: 'Faltas', cor: 'red'},
    ];


  } catch (error) {
    this.data.labels = [];
    this.data.series = [];
  } finally {
    this.loading = false;
  }

}

}
