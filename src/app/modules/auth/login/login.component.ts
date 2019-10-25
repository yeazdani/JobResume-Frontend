import { AuthService } from './../../shared/services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  invalid: Boolean = false;
  disabled: Boolean = true;

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
      this.invalid = true;
      return;
    }
    this.disabled = false;
    this.loading = true;
    const signInPayload = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }
    this.authService.login(signInPayload).subscribe(
      res => {
        this.loading = false;
        this.router.navigate(['/jobs'])
      },
      err => {
        this.disabled = false;
        this.loading = false;
        this.invalid = true;
        console.log(err)
      }
    )
  }

}
