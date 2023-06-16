import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './container/users/users.component';
import { UserFormComponent } from './container/user-form/user-form.component';
import { UserResolve } from './guards/user.resolver';

const routes: Routes = [
  { path: '', component: UsersComponent },
  {
    path: 'form',
    component: UserFormComponent,
    resolve: {
      user: UserResolve,
    },
  },
  {
    path: 'edit/:id',
    component: UserFormComponent,
    resolve: {
      user: UserResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
