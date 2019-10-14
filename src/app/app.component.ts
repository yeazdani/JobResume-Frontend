import { AuthService } from './modules/shared/services/auth-service/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mcit-final-project';
  constructor(
    private authService: AuthService
  ) { }

  ngOnInIt(){
    
  }
}
