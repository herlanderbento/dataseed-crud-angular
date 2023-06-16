import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserModel } from '../../model/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  @Input() users: UserModel[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['name', 'email', 'actions'];
  readonly pageSizeOptions = [];

  public onAdd() {
    this.add.emit(true);
  }

  public onEdit(user: UserModel) {
    this.edit.emit(user);
  }

  public onDelete(user: UserModel) {
    this.remove.emit(user);
  }
}
