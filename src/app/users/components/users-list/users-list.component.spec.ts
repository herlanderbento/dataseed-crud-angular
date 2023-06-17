import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UserModel } from '../../model/user';
import { MatIconModule } from '@angular/material/icon';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let users: Partial<UserModel[]>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [MatTableModule, MatButtonModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;

    users = [
      {
        id: '1',
        name: 'User 1',
        email: 'user1@example.com',
        password: 'password',
      },
      {
        id: '2',
        name: 'User 2',
        email: 'user2@example.com',
        password: 'password',
      },
    ];

    component.users = users as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
