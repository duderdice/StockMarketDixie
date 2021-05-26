import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './components/app/app.component';
import { APP_ACTION_HANDLERS } from './app.actionHandlers';
import { APP_COMPONENTS } from './app.components';
import { APP_SERVICES } from './app.services';
import { APP_STORES } from './app.stores';

@NgModule({
  declarations: [
    ...APP_COMPONENTS
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    StoreModule.forRoot(APP_STORES)
  ],
  providers: [
    ...APP_ACTION_HANDLERS,
    ...APP_SERVICES,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
