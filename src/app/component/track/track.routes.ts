import { Routes } from '@angular/router';
import { TrackAddComponent } from './track-add/track-add.component';
import { TrackListComponent } from './track-list/track-list.component';
import { TrackComponent } from './track.component';

export const trackRoutes: Routes = [
  {
    path: '',
    component: TrackComponent, // parent (menu + outlet)
    children: [
      { path: 'add', component: TrackAddComponent },
      { path: 'list', component: TrackListComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' } // default
    ]
  }
];


