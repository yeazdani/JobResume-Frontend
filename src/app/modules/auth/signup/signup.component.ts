import { UserInfo } from './../../models/user-info.model';
import { AuthService } from './../../shared/services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../../shared/services/profile-service/profile.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  userInfo: UserInfo;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService
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
        Validators.pattern("[^ @]*@[^ @]*")
      ]
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // acceptTerms: [false, Validators.requiredTrue]
    });
  }

  signUp() {

    if (this.registerForm.invalid) {
      console.log('Invalid Form')
      return;
    }

    const newUser = {
      "first_name": this.registerForm.value.first_name,
      "last_name": this.registerForm.value.last_name,
      "email": this.registerForm.value.email,
      "password": this.registerForm.value.password,
      "current_title": "",
      "phone": "",
      "location": "",
      "picRef": ""
    };

    this.authService.register(newUser).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err)
      }
    );

  }

}
