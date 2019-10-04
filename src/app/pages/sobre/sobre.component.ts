import { Component, OnInit } from '@angular/core';

declare var require: any;

@Component({
  selector: 'sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent implements OnInit {

  constructor() { }

  public versao: string

  ngOnInit() {
    const { version: appVersion } = require('../../../../package.json')
    this.versao = appVersion
  }

}
