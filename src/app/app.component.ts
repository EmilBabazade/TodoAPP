import { Component, OnInit } from '@angular/core';
import { Alert } from './_modals/alert';
import { AlertService } from './_services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  alert: Alert | null = null;
  title = 'todo-app';

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.alertService.alert$.subscribe((alert: Alert | null) => {
      if(!alert) return;
      this.alert = alert;
      setTimeout(() => {
        this.alertService.newAlert(null);
        this.alert = null;
      }, 10000)
    })
  }

}
