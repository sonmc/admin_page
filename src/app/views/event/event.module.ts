import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventComponent } from './event.component';
import { EventRoutingModule } from './event.routing.module';

@NgModule({
  imports: [EventRoutingModule, CommonModule, FormsModule],
  declarations: [EventComponent],
})
export class EventModule {}
