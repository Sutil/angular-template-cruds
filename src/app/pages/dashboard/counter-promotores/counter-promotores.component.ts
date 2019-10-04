import { Component, OnInit } from '@angular/core';
import { CounterPromotoresService } from './counter-promotores.service';

@Component({
  selector: 'counter-promotores',
  templateUrl: './counter-promotores.component.html',
  styleUrls: ['./counter-promotores.component.scss']
})
export class CounterPromotoresComponent implements OnInit {

  constructor(private service: CounterPromotoresService) { }

  value: number | string = 0;
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
      this.value = await this.service.count();
    } catch (error) {
      this.value = '--'
    }
    finally {
      this.loading = false;
    }
  }

}
