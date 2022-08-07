import { Component, OnInit } from '@angular/core';
import { Todo } from '../_models/todo/todo';
import { TodoService } from '../_services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getAll().subscribe(todos => this.todos = todos);
  }

}
