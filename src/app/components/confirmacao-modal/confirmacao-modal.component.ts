import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'confirmacao-modal',
  templateUrl: './confirmacao-modal.component.html',
})
export class ConfirmacaoModalComponent {

  title: string = '';
  text: string = '';
  noButton: string = 'Não';
  yesButton: string = 'Sim';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string,
    text: string,
    noButton?: string,
    yesButton?: string,
  }) {
    this.title = data.title;
    this.text = data.text;
    if (data.noButton) {
      this.noButton = data.noButton;
    }
    if (data.yesButton) {
      this.yesButton = data.yesButton;
    }
  }
}