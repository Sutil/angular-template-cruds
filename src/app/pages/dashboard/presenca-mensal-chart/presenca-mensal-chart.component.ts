import { Component, OnInit } from '@angular/core';
import { PresencaMensalService } from './presenca-mensal.service';


const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
];

function formatDay(number) {
  return (number < 10 ? '0' : '') + number;
}

@Component({
  selector: 'presenca-mensal-chart',
  templateUrl: './presenca-mensal-chart.component.html',
  styleUrls: ['./presenca-mensal-chart.component.scss']
})
export class PresencaMensalChartComponent implements OnInit {

  constructor(private service: PresencaMensalService) { }

  loading: boolean;

  data = {
    labels: [],
    series: [],
    legendas: [],
  }

  ngOnInit() {
      this.loadData();
  }

  update() {
    this.loadData();
  }

  async loadData() {
    this.loading = true;

    try {
      const data = await this.service.getData();

      this.data.labels = data.map(dado => {
        const dia = new Date(dado.data);
        return `${formatDay(dia.getDate())}/${monthNames[dia.getMonth()]}`
      })

      this.data.series = [];

      this.data.series.push(data.map(dado => dado.presencas));
      this.data.series.push(data.map(dado => dado.faltas));

      this.data.legendas = [
        {legenda: 'Horas Trabalhadas', cor: 'green'},
        {legenda: 'Horas Faltosas', cor: 'red'},
      ];

    } catch (error) {
      this.data.labels = [];
      this.data.series = [];
    } finally {
      this.loading = false;
    }

  }

}
