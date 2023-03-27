import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceEventsAddPageRoutingModule } from './place-events-add-routing.module';

import { PlaceEventsAddPage } from './place-events-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PlaceEventsAddPageRoutingModule
  ],
  declarations: [PlaceEventsAddPage]
})
export class PlaceEventsAddPageModule {}
