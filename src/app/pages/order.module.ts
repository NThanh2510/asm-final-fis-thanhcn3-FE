import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderListComponent } from './order-list-task/order-list.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderCustomComponent } from './order-custom/order-custom.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    OrderComponent,
    OrderListComponent,
    OrderCreateComponent,
    OrderCustomComponent,

  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class OrderModule { }
