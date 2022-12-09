import { Component, OnInit } from '@angular/core';
import {Store} from "@ngxs/store";
import {CartState} from "../../states/cartState";
import {Observable} from "rxjs";
import {Offer} from "../../types";
import {DeleteCartOffer} from "../../actions/cartAction";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  offers$ : Observable<Offer[]>;
  price: number = 0;

  constructor(private store : Store) {
    this.offers$ = this.store.select(CartState.getOffers);
  }

  ngOnInit(): void {
    this.offers$.subscribe(offers => {
      this.price = 0;
      offers.forEach(offer => {
        this.price += offer.price;
      });
    });
  }

  deleteFromCart(offer : Offer){
    this.store.dispatch(new DeleteCartOffer(offer));
  }
}
