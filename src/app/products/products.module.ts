import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ProductsUpdataComponent } from './products-updata/products-updata.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/core/interceptor/auth.interceptor';
import { ProductDetailDialogComponent } from './product-detail-dialog/product-detail-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductsCreateComponent,
    ProductsUpdataComponent,
    ProductDetailDialogComponent,
    ProductsDetailComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  providers: [ 
       {
         provide: HTTP_INTERCEPTORS, 
         useClass: AuthInterceptor, 
         multi: true 
       },
       
     ]
     
})
export class ProductsModule {}
