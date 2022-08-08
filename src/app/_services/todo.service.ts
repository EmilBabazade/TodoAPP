import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddTodo } from '../_models/todo/add-todo';
import { Todo } from '../_models/todo/todo';
import { UpdateTodo } from '../_models/todo/update-todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly apiUrl = environment.apiUrl + 'Todo';

  constructor(private http: HttpClient) {
  }

  create(todo: AddTodo): Observable<Todo> {
    todo.dueDate.setDate(todo.dueDate.getDate() + 1);
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  getAll(dueDate = '', order = 'desc'): Observable<Todo[]> {
    let params = new HttpParams();
    params = params.append('dueDate', dueDate);
    params = params.append('order', order);
    return this.http.get<Todo[]>(this.apiUrl, { params });
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  update(id: number, todo: UpdateTodo): Observable<Todo> {
    todo.dueDate.setDate(todo.dueDate.getDate() + 1);
    return this.http.patch<Todo>(this.apiUrl + '/' + id, todo);
  }

  getOne(id: number): Observable<Todo> {
    return this.http.get<Todo>(this.apiUrl + '/' + id);
  }
}
