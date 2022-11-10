import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { SharedModule } from './shared/shared.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { FlexLayoutModule } from "@angular/flex-layout";
import { environment } from '../environments/environment';
import { AgentUndercoverService } from './agentundercover.service';
import { AgentUndercoverErstellenComponent } from './agentundercover/create/create.component';
import { AgentUndercoverSpielComponent } from './agentundercover/game/game.component';
import { NotificationService } from './animations/notification.service';
import { ApiInterceptor } from './api.interceptor';
import { AuswahlComponent } from './auswahl/auswahl.component';
import { WerwoelfeService } from './werwoelfe.service';
import { WerwoelfeErstellenComponent } from './werwoelfe/create/create.component';
import { WerwoelfeSpielComponent } from './werwoelfe/game/game.component';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    AuswahlComponent,
    WerwoelfeErstellenComponent,
    WerwoelfeSpielComponent,
    AgentUndercoverErstellenComponent,
    AgentUndercoverSpielComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-De' },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: 'environment', useValue: environment },
    WerwoelfeService,
    AgentUndercoverService,
    NotificationService
  ]
})
export class AppModule { }
