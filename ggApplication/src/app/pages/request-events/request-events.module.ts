import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestEventsPageRoutingModule } from './request-events-routing.module';

import { RequestEventsPage } from './request-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestEventsPageRoutingModule
  ],
  declarations: [RequestEventsPage]
})
export class RequestEventsPageModule {}
