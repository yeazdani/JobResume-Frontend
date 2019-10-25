import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth-service/auth.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../shared/services/storage-service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  navbarOpen = false;
  
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) { }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit() {
    if (this.storageService.getToken()) {
      this.userIsAuthenticated = true;
    }
    this.authListenerSubs = this.authService
      .getAuthStatusListener().subscribe(
        isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
        }
      )
  }

  logout() {
    this.storageService.removeToken();
    this.storageService.removeCurrentUser();
    this.userIsAuthenticated = false;
    this.router.navigate(['/jobs']);
  }

  ngOnDestry() {
    this.authListenerSubs.unsubscribe();
  }
}
