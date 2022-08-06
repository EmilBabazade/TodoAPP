import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { LoginModel } from '../_models/login-model';
import { RegisterModel } from '../_models/register-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  readonly apiUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User| null>(1);
  currentUser$: Observable<User | null> = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  login(model: LoginModel): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'users/login', model)
      .pipe(
        map((response: User) => {
          const user = response;
          if(user) {
            this.setCurrentUser(user);
          }
          return user;
        })
      );
  }

  register(model: RegisterModel): Observable<any> {
    return this.http.post(this.apiUrl + 'users/register', model);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
