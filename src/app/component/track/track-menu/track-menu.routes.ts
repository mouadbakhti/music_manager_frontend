import { Routes } from '@angular/router';
import { TrackAddComponent } from '../track-add/track-add.component';
import { TrackListComponent } from '../track-list/track-list.component';

export const trackMenuRoutes: Routes = [
  {
    path: 'add',
    component: TrackAddComponent
  },
  {
    path: 'list',
    component: TrackListComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];
