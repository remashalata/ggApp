import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'locate',
    pathMatch: 'full'
  },
  {
    path: 'locate',
    loadChildren: () => import('./pages/locate/locate.module').then( m => m.LocatePageModule)
  },
  {
    path: 'active',
    loadChildren: () => import('./pages/active/active.module').then( m => m.ActivePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'thankyou',
    loadChildren: () => import('./pages/thankyou/thankyou.module').then( m => m.ThankyouPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'popover',
    loadChildren: () => import('./pages/popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'event-detail',
    loadChildren: () => import('./pages/event-detail/event-detail.module').then( m => m.EventDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'request-events',
    loadChildren: () => import('./pages/request-events/request-events.module').then( m => m.RequestEventsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-events',
    loadChildren: () => import('./pages/admin-events/admin-events.module').then( m => m.AdminEventsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'place-events',
    loadChildren: () => import('./pages/place-events/place-events.module').then( m => m.PlaceEventsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'placeeventadd',
    loadChildren: () => import('./pages/place-events-add/place-events-add.module').then( m => m.PlaceEventsAddPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
