import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserRoleComponent } from './user-role/user-role.component';

const routes: Routes = [
  { path: 'list', component: UserListComponent },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'role', component: UserRoleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
