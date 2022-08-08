import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Todo } from '../_models/todo/todo';
import { AlertService } from '../_services/alert.service';
import { TodoService } from '../_services/todo.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit, OnDestroy {
  todoForm!: FormGroup;
  paramsSub?: Subscription;
  todo?: Todo;

  constructor(
    private todoService: TodoService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    if (this.paramsSub)
      this.paramsSub.unsubscribe();
  }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      text: ['', Validators.required],
      dueDate: ['', Validators.required],
      done: ['', Validators.required]
    });
    this.paramsSub = this.route.params.subscribe(params => {
      const { id } = params;
      this.todoService.getOne(id).subscribe({
        next: todo => {
          this.todo = todo;
          this.todoForm.setValue({
            text: todo.text,
            dueDate: this.convertToMMDDYYYY(new Date(todo.dueDate)),
            done: todo.done
          });
        },
        error: err => this.router.navigateByUrl('/list')
      });
    })
  }

  private convertToMMDDYYYY(date: Date) {
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  }

  submit() {
    this.todoService.update(this.todo.id, {
      ...this.todoForm.value,
      done: new Boolean(this.todoForm.value.done),
      dueDate: new Date(this.todoForm.value.dueDate)
    })
      .subscribe(() => {
        this.router.navigateByUrl('/list');
        this.alertService.newAlert({
          message: `Todo No ${this.todo.id} was updated!`,
          type: 'success'
        })
      });
  }

}
