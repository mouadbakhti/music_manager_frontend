import { Routes } from '@angular/router';
import { HelloComponent } from './component/hello/hello.component';
import { TrackComponent } from './component/track/track.component';

export const routes: Routes = [
	{
		path: 'hello',
		component: HelloComponent
	},
	{
		path: 'api/track/:id',
		component: TrackComponent
	},
    {
        path: 'api/tracks',
        component: TrackComponent
    },
    {
        path: 'api/track',
        component: TrackComponent
    }
];
