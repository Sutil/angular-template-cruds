import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card-counter',
  templateUrl: './card-counter.component.html',
  styleUrls: ['./card-counter.component.scss'],
})
export class CardCounterComponent implements OnInit {

  @Input()
  icon: string;

  @Input()
  title: string;

  @Input()
  value: string;

  @Input()
  backgroundColor: 'green' | 'red' | 'blue' | 'yellow' | 'orange' = 'green';

  @Output()
  updateClicked: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  update() {
    this.updateClicked.emit();
  }

}
