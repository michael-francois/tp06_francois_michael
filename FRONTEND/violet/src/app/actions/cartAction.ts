import {Offer} from "../types";

export class AddCartOffer {
  static readonly type = 'Cart-Add';
  constructor(public payload: Offer) {
  }
}

export class DeleteCartOffer {
  static readonly type = 'Cart-Delete';
  constructor(public payload: Offer) {}
}
