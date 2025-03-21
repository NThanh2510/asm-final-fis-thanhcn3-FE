import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsUpdataComponent } from './products-updata/products-updata.component';
import { ProductsCreateComponent } from './products-create/products-create.component';

const routes: Routes = [
  {
    path: 'list',
    component: ProductsListComponent
  },
  {
    path: 'create',
    component: ProductsCreateComponent
  },
  {
    path: 'update',
    component: ProductsUpdataComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
