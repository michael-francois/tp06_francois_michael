import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import {Observable} from "rxjs";
import {Offer} from "./types";

@Injectable({
  providedIn: "root"
})
export class OfferService {
  env = environment

  constructor(private readonly httpClient: HttpClient) { }

  public getOffers(select?: string): Observable<Offer[]> {
    let query = "";
    if (select) {
      query = `?q=${select}`;
    }

    return this.httpClient.get<Offer[]>(`${this.env.backendUrl}/offers${query}`);
  }
}
