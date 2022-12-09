import { NgModule } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import {NgxsModule} from "@ngxs/store";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {OfferService} from "./offer.service";
import {CartState} from "./states/cartState";
import {ApiInterceptor} from "./api.interceptor";
import {SecurityState} from "./states/securityState";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    NgxsModule.forRoot([CartState, SecurityState])
  ],
  providers: [
    OfferService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
      deps: [Router]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
