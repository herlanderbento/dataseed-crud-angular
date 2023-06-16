import { Observable } from 'rxjs';
import { UserModel } from '../model/user';

export interface UserRepositoryInterface {
  save(record: Partial<UserModel>): any;
  findById(id: string): Observable<UserModel>;
  list(): Observable<UserModel[]>;
  delete(id: string): Observable<void>;
}
