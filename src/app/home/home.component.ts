import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPresent, AuthService } from '../services/auth.service';
import { PresentService } from '../services/present.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  presents: Observable<IPresent[]>;
  user;
  isLoggedIn: boolean;
  // displayName: string;

  constructor(
    private authService: AuthService,
    private presentService: PresentService
  ) { 
    this.user = this.authService.user;
    this.presents = this.authService.presents;
    this.isLoggedIn = this.authService.isLoggedIn;
    // this.displayName = this.authService.user.displayName;
  }

  logout() {
    this.authService.logout;
  }

  ngOnInit() {
  }

}