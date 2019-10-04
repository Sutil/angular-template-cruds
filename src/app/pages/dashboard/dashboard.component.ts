import { BrandService } from './../custom-cruds/brand/brand.module';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Chartist from 'chartist';

import { Filial } from 'app/models/filial.model';
import { FilialService } from 'app/@core/data/filial.service';
import { Router } from '@angular/router';
import { ModelService } from '../custom-cruds/model/model.module';
import { OwnerService } from '../custom-cruds/owner/owner.module';

@Component({
  selector: 'wtc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  loading = false;

  dealershipsSales = [50, 23, 26];
  dealershipLabels = ['Eagle', 'Run', 'FastCar']

  daySellMore: Chartist.IChartistData = {
    series: [[15, 13, 67, 25, 22, 1, 10]],
    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  }

  newCustomersData: Chartist.IChartistData = {
    series: [[15, 13, 67, 25, 22, 1, 10, 15, 13, 67, 25, 22]],
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  }

  constructor(
    private brandService: BrandService,
    private modelService: ModelService,
    private owerService: OwnerService,
    private businessService: FilialService,
  ) {}

  brandCount = 0;
  modelCount = 0;
  ownerCount = 0;
  dealershipCount = 0;

  ngOnInit() {
    this.loading = true;
    this.updateBrand();
    this.updateModel();
    this.updateOwner();
    this.updateDealership();

    this.loading = false;
  }

  async updateBrand() {
    this.brandCount = await this.brandService.count();
  }

  async updateModel() {
    this.modelCount = await this.modelService.count();
  }

  async updateOwner() {
    this.ownerCount = await this.owerService.count();
  }

  async updateDealership() {
    this.dealershipCount = await this.businessService.count();
  }
}
