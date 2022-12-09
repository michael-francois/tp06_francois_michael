import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {CartState} from "../states/cartState";
import {Observable} from "rxjs";
import {SecurityState} from "../states/securityState";
import {DeleteJWT} from "../actions/securityAction";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Select(CartState.getCount) cartItems$!: Observable<number>;
  @Select(SecurityState.isSignin) isSignIn!: Observable<boolean>;
  @Select(SecurityState.getJWT) jwt!: Observable<string>;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(new DeleteJWT());
  }
}
