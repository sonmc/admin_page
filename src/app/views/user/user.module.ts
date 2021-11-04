import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user.component';

@NgModule({
  imports: [UserRoutingModule, CommonModule, FormsModule],
  declarations: [UserComponent],
})
export class UserModule {}
