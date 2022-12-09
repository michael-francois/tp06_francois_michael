import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterModule, Routes} from "@angular/router";
import { OffersComponent } from './offers/offers.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: OffersComponent
  },
  {
    path: ":id",
    component: OfferDetailComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];
@NgModule({
  declarations: [
    OffersComponent,
    OfferDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule.forChild(routes)
  ]
})
export class OffersModule { }
