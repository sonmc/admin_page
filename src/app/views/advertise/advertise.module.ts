import { NgModule } from '@angular/core';
import { AdvertiseRoutingModule } from './advertise-routing.module';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdvertiseComponent } from './advertise.component';

@NgModule({
  imports: [AdvertiseRoutingModule, CommonModule, FormsModule],
  declarations: [AdvertiseComponent],
})
export class AdvertiseModule {}
