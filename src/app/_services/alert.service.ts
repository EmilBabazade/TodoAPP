import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Alert } from '../_modals/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSource = new BehaviorSubject<Alert | null>(null);
  alert$: Observable<Alert | null> = this.alertSource.asObservable();

  constructor() { }

  newAlert(alert: Alert | null) {
    this.alertSource.next(alert);
  }
}
