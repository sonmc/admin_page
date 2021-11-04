import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductTypeComponent } from './product-type.component';
import { ProductTypeRoutingModule } from './product-type.routing.module';

@NgModule({
  imports: [ProductTypeRoutingModule, CommonModule, FormsModule],
  declarations: [ProductTypeComponent],
})
export class ProductTypeModule {}
