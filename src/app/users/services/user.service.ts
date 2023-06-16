import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../model/user';
import { Observable, delay, first, map, tap } from 'rxjs';
import { UserRepositoryInterface } from '../repository/user-repository.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService implements UserRepositoryInterface {
  private readonly API = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  public save(entity: Partial<UserModel>): any {
    if (entity.id) {
      return this.update(entity);
    }
    return this.create(entity);
  }

  public findById(id: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.API}/${id}`);
  }

  public list(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(this.API).pipe(
      first(),
      delay(1000),
      tap((response: UserModel[]): void => {
        // console.log(response);
      })
    );
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(
      tap(() => {}),
      map(() => undefined)
    );
  }

  private create(entity: Partial<UserModel>): Observable<void> {
    return this.httpClient.post<void>(this.API, entity).pipe(first());
  }

  private update(entity: Partial<UserModel>): Observable<void> {
    return this.httpClient
      .put<void>(`${this.API}/${entity.id}`, entity)
      .pipe(first());
  }
}
