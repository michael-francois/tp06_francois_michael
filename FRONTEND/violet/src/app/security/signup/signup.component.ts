import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../client.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form!: FormGroup;

  constructor(private readonly router: Router, private readonly formBuilder: FormBuilder, private readonly clientService: ClientService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [
        "", { validators: [Validators.required, Validators.email] }
      ],
      password: [
        "", { validators: [Validators.required, Validators.minLength(8)] }
      ],
      cpassword: [
        "", { validators: [Validators.required, Validators.minLength(8)] }
      ]
    });
  }

  public signup(): void  {
    if (this.form.valid) {
      if (this.form.value.password === this.form.value.cpassword) {
        this.clientService.signUp(this.form.value.email, this.form.value.password).subscribe(token => {
          this.router.navigate(["/"]);
        });
      }
    }
  }
}
