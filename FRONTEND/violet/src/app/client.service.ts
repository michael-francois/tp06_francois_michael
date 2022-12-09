import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {map, Observable} from "rxjs";

import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  env = environment;

  constructor(private httpClient : HttpClient) { }

  public signIn(email: string, password: string): Observable<HttpEvent<any>> {
    return this.httpClient.post<HttpEvent<any>>(this.env.backendUrl + "/signin", {email, password}, {observe: "response"});
  }

  public signUp(email: string, password: string): Observable<any> {
    return this.httpClient.post(this.env.backendUrl + "/signup", {email, password});
  }
}
