import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-logout',
  templateUrl: './confirm-logout.component.html',
  styleUrls: ['./confirm-logout.component.css']
})
export class ConfirmLogoutComponent implements OnInit {
  @Input() open = false;
  @Output() confirm = new EventEmitter(false);

  constructor() { }

  ngOnInit(): void {
  }

}
