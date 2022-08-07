import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logoutDialog = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  confirmSignOut(confirmed: boolean) {
    if(confirmed) {
      this.accountService.logout();
      this.router.navigateByUrl('/');
      this.alertService.newAlert({message: 'Logged Out!', type: 'info'});
    }
    this.logoutDialog = false;
  }
}
