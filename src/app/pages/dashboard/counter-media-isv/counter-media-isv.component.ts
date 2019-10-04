import { Component, OnInit } from '@angular/core';
import { ConuterMediaISVService } from './counter-media-isv.service';

@Component({
  selector: 'counter-media-isv',
  templateUrl: './counter-media-isv.component.html',
  styleUrls: ['./counter-media-isv.component.scss']
})
export class CounterMediaISVComponent implements OnInit {

  constructor(private service: ConuterMediaISVService) { }

  value: number | string = '--'
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
      const isvs: any[] = await this.service.findIsvs();
      this.value = this.calculaMedia(isvs);

    } catch (error) {
      this.value = '--';
    }
    finally {
      this.loading = false;
    }
  }

  calculaMedia(isvs: any[]): number {
    let totalDeDias = 0;
    let totalISVs = 0;

    for (const i of isvs) {
      totalDeDias ++;
      totalISVs += i.qtdeIsv;
    }

    const media = totalISVs / totalDeDias;

    return Math.floor(media);
  }

}
