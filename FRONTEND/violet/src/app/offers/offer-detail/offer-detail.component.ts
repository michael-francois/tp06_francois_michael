import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OfferService} from "../../offer.service";
import {Offer} from "../../types";
import {AddCartOffer} from "../../actions/cartAction";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {

  public offer: Offer | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly offerService: OfferService) { }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.offerService.getOffers().subscribe(offers => {
      this.offer = offers.find(offer => offer.id === id);
    })
  }

  public addToCart(): void {
    if (this.offer) {
      this.store.dispatch(new AddCartOffer(this.offer));
    }
  }
}
