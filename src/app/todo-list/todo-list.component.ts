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
  deleteId: number | null = null;
  showDeleteModal = false;

  constructor(
    private todoService: TodoService,) { }

  ngOnInit(): void {
    this.getAll();
  }

  doneUnDone(todo: Todo) {
    todo.done = !todo.done;
    this.todoService.update(todo.id, todo).subscribe(res => this.getAll());
  }

  openDeleteModal(todo: Todo) {
    this.deleteId = todo.id;
    this.showDeleteModal = true;
  }

  delete(confirmed: boolean) {
    if (confirmed) {
      this.getAll();
    }
    this.showDeleteModal = false;
  }

  private getAll() {
    this.todoService.getAll().subscribe(todos => this.todos = todos);
  }
}
