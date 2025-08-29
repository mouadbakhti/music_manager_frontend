import { Routes } from '@angular/router';
import { HelloComponent } from './component/hello/hello.component';
import { TrackComponent } from './component/track/track.component';
import { trackRoutes } from './component/track/track.routes';

export const routes: Routes = [
	{
		path: 'hello',
		component: HelloComponent
	},
	{
		path: 'track',
		children: trackRoutes
	},
	{ path: '', redirectTo: 'tracks', pathMatch: 'full' }
];
