import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceEventsPageRoutingModule } from './place-events-routing.module';

import { PlaceEventsPage } from './place-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceEventsPageRoutingModule
  ],
  declarations: [PlaceEventsPage]
})
export class PlaceEventsPageModule {}
