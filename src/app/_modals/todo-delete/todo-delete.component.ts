import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { TodoService } from 'src/app/_services/todo.service';

@Component({
  selector: 'app-todo-delete',
  templateUrl: './todo-delete.component.html',
  styleUrls: ['./todo-delete.component.css']
})
export class TodoDeleteComponent implements OnInit {
  @Input() show = false;
  @Input() id: number | null = null;
  @Output() close = new EventEmitter<boolean>(true);

  constructor(
    private todoService: TodoService,
    private alertService: AlertService) { }

  ngOnInit(): void {
  }

  confirm() {
    this.todoService.delete(this.id)
      .subscribe(() => {
        this.alertService.newAlert({
          message: `Todo No ${this.id} was deleted!`,
          type: 'info'
        });
        this.close.emit(true);
      });
  }

}
