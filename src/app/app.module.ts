import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './core/state/user/user.reducer';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { headerReducer } from './core/state/header/header.reducer';
import { dateReducer } from './core/state/date/date.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DateEffects } from './core/state/date/date.effects';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
registerLocaleData(localeHu);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([DateEffects]),
    StoreModule.forRoot({
      user: userReducer,
      headerMode: headerReducer,
      date: dateReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'hu' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
