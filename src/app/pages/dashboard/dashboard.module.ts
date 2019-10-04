import { CardCounterModule } from './../../components/card-counter/card-counter.module';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { MatProgressBarModule, MatButtonModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LineChartSmModule } from '../../components/line-chart-sm/line-chart-sm.module';
import { PresencaSemanalChartComponent } from './presenca-semanal-chart/presenca-semanal-chart.component';
import { HorasTrabalhadasChartComponent } from './horas-trabalhadas-chart/horas-trabalhadas-chart.component';
import { StackedBarChartComponent } from '../../components/stacked-bar-chart/stacked-bar-chart.component';
import { StackedBarChartModule } from '../../components/stacked-bar-chart/stacked-bar-chart.module';
import { IsvSemanalComponent } from './isv-semanal/isv-semanal.component';
import { CounterFiliaisModule } from './counter-filiais/counter-filiais.module';
import { CounterPromotoresModule } from './counter-promotores/counter-promotores.module';
import { CounterPercentualPresencasModule } from './counter-percentual-presencas/counter-percentual-presencas.module';
import { CounterMediaISVModule } from './counter-media-isv/counter-media-isv.module';
import { DonutChartSmModule } from '../../components/donut-chart-sm/donut-chart-sm.module';
import { PresencaDiariaChartModule } from './presenca-diaria-chart/presenca-diaria-chart.module';
import {
  HorastrabalhadasDiarioChartModule, 
} from './horastrabalhadas-diario-chart/horastrabalhadas-diario-chart.module';
import { IsvDiarioChartModule } from './isv-diario-chart/isv-diario-chart.module';
import { CardIconUpdatableModule } from '../../components/card-icon-updatable/card-icon-updatable.module';
import { LineChartMdModule } from '../../components/line-chart-md/line-chart-md.module';
import { PresencaMensalChartModule } from './presenca-mensal-chart/presenca-mensal-chart.module';
import { PresencaAnualChartModule } from './presenca-anual-chart/presenca-anual-chart.module';
import { HorasTrabalhadasAnualChartModule } from './horas-trabalhadas-anual-chart/horas-trabalhadas-anual-chart.module';
import { IsvAnualChartModule } from './isv-anual-chart/isv-anual-chart.module';
import { IsvMensalChartModule } from './isv-mensal-chart/isv-mensal-chart.module';

const MATERIAL_MODULES = [
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatProgressBarModule,
  MatButtonModule,
];

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    CardIconUpdatableModule,
    CardCounterModule,
    CounterFiliaisModule,
    CounterPromotoresModule,
    CounterPercentualPresencasModule,
    CounterMediaISVModule,
    PresencaDiariaChartModule,
    PresencaMensalChartModule,
    PresencaAnualChartModule,
    HorastrabalhadasDiarioChartModule,
    HorasTrabalhadasAnualChartModule,
    IsvDiarioChartModule,
    IsvAnualChartModule,
    IsvMensalChartModule,
    DonutChartSmModule,
    MatProgressSpinnerModule,
    LineChartSmModule,
    LineChartMdModule,
    StackedBarChartModule,
    LeafletModule.forRoot(),

    ...MATERIAL_MODULES,
  ],
  declarations: [
    DashboardComponent,
    PresencaSemanalChartComponent,
    HorasTrabalhadasChartComponent,
    IsvSemanalComponent],
})
export class DashboardModule { }
