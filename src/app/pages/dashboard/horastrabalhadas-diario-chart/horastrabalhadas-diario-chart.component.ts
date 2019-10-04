import { Component, OnInit, Input } from '@angular/core';
import { HorasTrabalhadasDiariaService } from './horas-trabalhadas-diaria.service';

@Component({
  selector: 'horastrabalhadas-diario-chart',
  templateUrl: './horastrabalhadas-diario-chart.component.html',
  styleUrls: ['./horastrabalhadas-diario-chart.component.scss'],
})
export class HorastrabalhadasDiarioChartComponent implements OnInit {

  constructor(private service: HorasTrabalhadasDiariaService) { }

  @Input()
  day: 'hoje' | 'ontem' = 'hoje';

  @Input()
  idChart: string = 'horas-trabalhadas-diario-chart'


  loading: boolean;

  data: number[];

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
      const totalHorasEsperadas = data.map(dado => dado.horasEsperadas).reduce((sum, current) => sum + current);
      const totalHorasTrabalhadas = data.map(dado => dado.horasTrabalhadas).reduce((sum, current) => sum + current);

      const totalHorasPendentes = totalHorasEsperadas - totalHorasTrabalhadas;

      this.data = [];
      this.data.push(totalHorasTrabalhadas);
      this.data.push(totalHorasPendentes);

    } catch (error) {
      this.data = [];
    }
    finally {
      this.loading = false;
    }
  }

}
