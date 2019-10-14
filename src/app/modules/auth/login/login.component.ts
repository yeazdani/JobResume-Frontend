import { AuthService } from './../../shared/services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isDisabled = false;
  loading = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isDisabled = true;
    this.loading = true;
    const signInPayload = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }
    this.authService.login(signInPayload).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.router.navigate(['/jobs'])
      },
      err => {
        this.isDisabled = false;
        this.loading = false;
        console.log(err);
      }
    )
  }

}
