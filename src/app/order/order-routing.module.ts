import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list-task/order-list.component';
import { OrderComponent } from './order.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderCustomComponent } from './order-custom/order-custom.component';

const routes: Routes = [
  {
    path: 'create',
    component: OrderCreateComponent
  },
  {
    path: 'list',
    component: OrderListComponent
  },
  {
    path: 'custom',
    component: OrderCustomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
