import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocatePageRoutingModule } from './locate-routing.module';

import { LocatePage } from './locate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocatePageRoutingModule
  ],
  declarations: [LocatePage]
})
export class LocatePageModule {}
