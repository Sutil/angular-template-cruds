import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card-icon-updatable',
  templateUrl: './card-icon-updatable.component.html',
  styleUrls: ['./card-icon-updatable.component.scss']
})
export class CardIconUpdatableComponent  {

  @Input()
  icon: string;

  @Input()
  title: string;

  @Input()
  color: 'green' | 'blue' | 'yellow' | 'red' = 'green';

  @Output()
  update: EventEmitter<void>  = new EventEmitter();

  constructor() { }

  onUpdateClicked() {
    this.update.emit();
  }

}
