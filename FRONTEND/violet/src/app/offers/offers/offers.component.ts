import { Component, OnInit } from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, map, Observable, Subject, switchMap} from "rxjs";
import {Offer} from "../../types";
import {OfferService} from "../../offer.service";
import {Store} from "@ngxs/store";
import {AddCartOffer} from "../../actions/cartAction";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  public offers$!: Observable<Offer[]>;
  public searchOffers$ = new Subject<string>();

  constructor(private readonly offerService: OfferService, private readonly store: Store) { }

  ngOnInit(): void {
    // load all offers
    this.searchOffers$.pipe(
      debounceTime(300),
      distinctUntilChanged()
      // switchMap(search => this.offerService.getOffers(search)) not working
    ).subscribe(search => {
      this.offers$ = this.offerService.getOffers(search);
    });

    this.offers$ = this.offerService.getOffers();
  }

  search(search: string): void {
    this.searchOffers$.next(search);
  }

  addCart(id: number): void {
    if (this.offers$) {

      this.offers$.subscribe(offers => {
        const offer = offers.find(offer => offer.id === id);
        if (offer) {
          this.store.dispatch(new AddCartOffer(offer));
        }
      })
    }
  }
}
