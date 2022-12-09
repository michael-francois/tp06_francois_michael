import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../client.service";
import {Select, Store} from "@ngxs/store";
import {HttpResponse} from "@angular/common/http";
import {SaveJWT} from "../../actions/securityAction";
import {SecurityState} from "../../states/securityState";
import {Observable} from "rxjs";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @Select(SecurityState.getJWT) token: Observable<string | undefined> | undefined;

  public form!: FormGroup;

  constructor(private readonly router: Router, private readonly formBuilder: FormBuilder, private readonly clientService: ClientService, private readonly store: Store) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [
        "", { validators: [Validators.required, Validators.email] }
      ],
      password: [
        "", { validators: [Validators.required, Validators.minLength(8)] }
      ],

    });
  }

  public signin(): void {
    if (this.form.valid) {
      this.clientService.signIn(this.form.value.email, this.form.value.password).subscribe({
        next: response => {
          if (response instanceof HttpResponse) {
            const token = response.headers.get("Authorization");
            if (token != null) {
              const tokenWithoutBearer = token.split(" ");
              if (tokenWithoutBearer.length == 2) {
                this.store.dispatch(new SaveJWT(tokenWithoutBearer[1]));
              }
            }
          }
          this.router.navigate(["/"]);
        },
        error: () => {
          console.log("error");
        }
      });
    }
  }
}
