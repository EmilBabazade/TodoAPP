import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert } from './_modals/alert';
import { User } from './_models/user';
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
  alertSub: Subscription;

  constructor(
    private alertService: AlertService,
    public router: Router,
    public accountService: AccountService) {
  }
  ngOnDestroy(): void {
    this.alertSub.unsubscribe();
  }

  ngOnInit(): void {
    this.setCurrentUser();
    this.showAlert();
  }

  private showAlert() {
    this.alertSub = this.alertService.alert$.subscribe((alert: Alert | null) => {
      if (!alert) return;
      this.alert = alert;
      setTimeout(() => {
        this.alertService.newAlert(null);
        this.alert = null;
      }, 5000)
    });
  }

  private setCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user')) as User;
    this.accountService.setCurrentUser(user);
  }

}
