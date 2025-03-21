import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderListComponent } from './order-list-task/order-list.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderCustomComponent } from './order-custom/order-custom.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/core/interceptor/auth.interceptor';
import { SaleOrderService } from 'src/core/services/SaleOrderService';


@NgModule({
  declarations: [
    OrderComponent,
    OrderListComponent,
    OrderCreateComponent,
    OrderCustomComponent,
    OrderDetailDialogComponent,
  

  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSlideToggleModule,
    MatDialogModule,

  ],
   providers: [ SaleOrderService,
      {
        provide: HTTP_INTERCEPTORS, 
        useClass: AuthInterceptor, 
        multi: true 
      },
      
    ]
    
})
export class OrderModule { }
