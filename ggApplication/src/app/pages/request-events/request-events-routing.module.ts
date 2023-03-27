import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestEventsPage } from './request-events.page';

const routes: Routes = [
  {
    path: '',
    component: RequestEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestEventsPageRoutingModule {}
