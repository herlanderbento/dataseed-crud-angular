import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserService } from './user.service';
import { UserModel } from '../model/user';
import { environment } from '../../../env';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should user by id', () => {
    const userId = '123';
    const mockUser: UserModel = {
      id: userId,
      name: 'Herlander Bento',
      email: '',
      password: '',
    };

    service.findById(userId).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const request = httpTestingController.expectOne(
      `${environment.API_Url}/users/${userId}`
    );
    expect(request.request.method).toEqual('GET');
    request.flush(mockUser);
  });

  it('should list of users', () => {
    const mockUsers: UserModel[] = [
      {
        id: '1',
        name: 'Antonio Gabriel',
        email: 'antoniogabriel@example.com',
        password: 'secret',
      },
      {
        id: '2',
        name: 'Eugenia Gaieta',
        email: 'eugeniagaieta@example.com',
        password: 'password',
      },
    ];

    service.list().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const request = httpTestingController.expectOne(
      `${environment.API_Url}/users`
    );
    expect(request.request.method).toEqual('GET');
    request.flush(mockUsers);
  });

  it('should create a new user', () => {
    const newUser: Partial<UserModel> = { name: 'Jorge Neto' };

    service.save(newUser).subscribe();

    const request = httpTestingController.expectOne(
      `${environment.API_Url}/users`
    );
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(newUser);
    request.flush({});
  });

  it('should update an user', () => {
    const updatedUser: Partial<UserModel> = { id: '1', name: 'Paulo Lopes' };

    service.save(updatedUser).subscribe();

    const request = httpTestingController.expectOne(
      `${environment.API_Url}/users/${updatedUser.id}`
    );
    expect(request.request.method).toEqual('PUT');
    expect(request.request.body).toEqual(updatedUser);
    request.flush({});
  });

  it('should delete a user by id', () => {
    const userId = '1';

    service.delete(userId).subscribe();

    const request = httpTestingController.expectOne(
      `${environment.API_Url}/users/${userId}`
    );
    expect(request.request.method).toEqual('DELETE');
    request.flush({});
  });
});
