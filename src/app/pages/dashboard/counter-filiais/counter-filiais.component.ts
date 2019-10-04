import { Component, OnInit } from '@angular/core';
import { CounterFiliaisService } from './counter-filiais.service';

@Component({
  selector: 'counter-filiais',
  templateUrl: './counter-filiais.component.html',
  styleUrls: ['./counter-filiais.component.scss']
})
export class CounterFiliaisComponent implements OnInit {

  constructor(private service: CounterFiliaisService) { }

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
