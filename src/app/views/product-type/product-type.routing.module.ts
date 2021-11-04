import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductTypeComponent } from './product-type.component';

const routes: Routes = [
  {
    path: '',
    component: ProductTypeComponent,
    data: {
      title: 'ProductType',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductTypeRoutingModule {}
