import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadChildren: async () =>
      (await import("./offers/offers.module")).OffersModule
  },
  {
    path: "offers",
    loadChildren: async () =>
      (await import("./offers/offers.module")).OffersModule
  },
  {
    path: "security",
    loadChildren: async () =>
      (await import("./security/security.module")).SecurityModule,
  },
  /*{
    path: "user",
    loadChildren: async () =>
      (await import("./user/user.module")).UserModule,
  },*/
  {
    path: "cart",
    loadChildren: async () =>
      (await import("./cart/cart.module")).CartModule
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
