import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  showHeader: boolean = true;
  isAuthentication = false;
  private userSub: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Hide Header on Login Page
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const routeData =
          this.router.routerState.snapshot.root.firstChild?.data;
        this.showHeader = !(routeData && routeData.showHeader === false);
      }
    });
  }
  logout() {
    this.authService.logoutUser();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
