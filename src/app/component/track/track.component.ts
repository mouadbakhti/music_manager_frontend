import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackService } from '../../services/track.service';
import { CommonModule } from '@angular/common';
import { TrackListComponent } from "./track-list/track-list.component";
import { TrackAddComponent } from "./track-add/track-add.component";

@Component({
  selector: 'app-track',
  imports: [CommonModule, TrackListComponent, TrackAddComponent],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent {
  track: any;
  tracks: any[] = [];


  constructor(private trackService: TrackService, private route: ActivatedRoute) { }

  // ngOnInit() {
  //   this.route.paramMap.subscribe(params => {
  //     const id = params.get('id');
  //     if (id) {
  //       this.trackService.getTrackById(id).subscribe({
  //         next: (data) => this.track = data,
  //         error: (err) => console.error('Error:', err)
  //       });
  //     }
  //   });

  //   this.trackService.getAllTracks().subscribe({
  //     next: (data) => this.tracks = data as any[],
  //     error: (err) => console.error('Error:', err)
  //   });
  // }

  // addNewTrack() {
  //   this.trackService.addTrack({ id: 5, title: 'November Rain', artist: 'Guns N Roses', duration: 300 }).subscribe({
  //     next: (data) => {
  //       console.log('Track added:', data);
  //       this.trackService.getAllTracks().subscribe({
  //         next: (tracks) => this.tracks = tracks as any[]
  //       });
  //     },
  //     error: (err) => console.error('Error:', err)
  //   });
  // }

}
