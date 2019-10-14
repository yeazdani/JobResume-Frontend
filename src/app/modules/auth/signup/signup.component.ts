import { Details } from './../../models/details.model';
import { AuthService } from './../../shared/services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.buildRegistrationForm();
  }

  buildRegistrationForm() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern("[^ @]*@[^ @]*")]
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  signUp() {
    // if (this.registerForm.invalid) {
    //   return;
    // }
    console.log('submitted')
    const newUser = {
      "first_name": this.registerForm.value.first_name,
      "last_name": this.registerForm.value.last_name,
      "email": this.registerForm.value.email,
      "password": this.registerForm.value.password
    };
    this.authService.register(newUser).subscribe(
      res => {
          console.log('registered successfully');
      }
    );

  }

}
