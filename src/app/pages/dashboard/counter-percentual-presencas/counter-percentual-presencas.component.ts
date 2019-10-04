import { Component, OnInit } from '@angular/core';
import { CounterPercentualPresencasService } from './counter-percentual-presencas.service';

@Component({
  selector: 'counter-percentual-presencas',
  templateUrl: './counter-percentual-presencas.component.html',
  styleUrls: ['./counter-percentual-presencas.component.scss']
})
export class CounterPercentualPresencasComponent implements OnInit {

  constructor(private service: CounterPercentualPresencasService) { }

  value: number | string = '--';
  loading: boolean;

  ngOnInit() {
    this.readValue();
  }

  update() {
    this.readValue();
  }

  async readValue() {
    this.loading = true;
    try {
      const presencas: any[] = await this.service.findPresencas();
      this.value = this.calculaPercentual(presencas);
    } catch (error) {
      this.value = '--';
    }
    finally {
      this.loading = false;
    }
  }

  calculaPercentual(presencas) {
    let totalPresenca = 0;
    let totalFalta = 0;

    for (const p of presencas) {
      totalPresenca += p.presencas;
      totalFalta += p.faltas;
    }

    const total = totalPresenca + totalFalta;

    let percentual = 0;

    if (total) {
      percentual = (totalPresenca * 100) / total;
    }

    return percentual.toFixed(1) + '%';
  }

}
