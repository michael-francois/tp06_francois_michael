import {CartStateModel} from "./cartStateModel";
import {Injectable} from "@angular/core";
import {AddCartOffer, DeleteCartOffer} from "../actions/cartAction";
import {Action, Selector, State, StateContext} from "@ngxs/store";

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    offers: []
  },
})
@Injectable()
export class CartState {
  @Selector()
  static getOffers(state: CartStateModel) {
    return state.offers;
  }

  @Selector()
  static getCount(state: CartStateModel) {
    return state.offers.length;
  }

  @Action(AddCartOffer)
  add({ getState, patchState }: StateContext<CartStateModel>, { payload }: AddCartOffer) {
    const state = getState();
    patchState({
      offers: [...state.offers, payload]
    });
  }

  @Action(DeleteCartOffer)
  delete({ getState, patchState }: StateContext<CartStateModel>, { payload }: DeleteCartOffer) {
    patchState({
      offers: getState().offers.filter(a => a !== payload)
    });
  }
}
