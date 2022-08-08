import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { TodoService } from 'src/app/_services/todo.service';

@Component({
  selector: 'app-todo-new',
  templateUrl: './todo-new.component.html',
  styleUrls: ['./todo-new.component.css']
})
export class TodoNewComponent implements OnInit {
  todoForm: FormGroup;

  constructor(
    private todoService: TodoService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      text: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  submit() {
    this.todoService.create({
      ...this.todoForm.value,
      dueDate: new Date(this.todoForm.value.dueDate),
    })
      .subscribe(() => {
        this.router.navigateByUrl('/list');
        this.alertService.newAlert({
          message: 'New todo was created!',
          type: 'success'
        })
      });
  }

}
