import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaceEventsPage } from './place-events.page';

const routes: Routes = [
  {
    path: '',
    component: PlaceEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceEventsPageRoutingModule {}
