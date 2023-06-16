import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { UsersModule } from '../users.module';

@Injectable({
  providedIn: 'root',
})
export class UserResolve {
  constructor(private service: UserService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<UsersModule> {
    if (route.params['id']) {
      return this.service.findById(route.params['id']);
    }
    return of({ id: '', name: '', email: '', password: '' });
  }
}
