import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from './_modals/alert';
import { AccountService } from './_services/account.service';
import { AlertService } from './_services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  alert: Alert | null = null;
  title = 'todo-app';
  loggedIn = false;
  alertSub: Subscription;
  userSub: Subscription;

  constructor(
    private alertService: AlertService,
    private accountService: AccountService) {
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.alertSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.accountService.currentUser$.subscribe(u => {
      this.loggedIn = u !== null;
    });
    this.alertSub = this.alertService.alert$.subscribe((alert: Alert | null) => {
      if(!alert) return;
      this.alert = alert;
      setTimeout(() => {
        this.alertService.newAlert(null);
        this.alert = null;
      }, 5000)
    })
  }

}
