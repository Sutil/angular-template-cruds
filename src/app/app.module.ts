import { APP_BASE_HREF, registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import ptBr from '@angular/common/locales/pt'
import { LOCALE_ID, NgModule } from '@angular/core'
import { MatDatepickerIntl } from '@angular/material'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CoreModule } from './@core/core.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthGuard } from './auth/auth.guard'
import { MatDatepickerPTBRIntl } from './i18n/mat-datepicker.intl'
import './util'

registerLocaleData(ptBr)

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    //... authProviders,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MatDatepickerIntl, useValue: MatDatepickerPTBRIntl },
  ],
})
export class AppModule {}
