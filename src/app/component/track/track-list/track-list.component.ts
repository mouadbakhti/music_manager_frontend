import { Component } from '@angular/core';
import { TrackService } from '../../../services/track.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-list',
  imports: [CommonModule],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.css'
})
export class TrackListComponent {

  track: any;
  tracks: any[] = [];
  constructor(private trackService: TrackService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.trackService.getTrackById(id).subscribe({
          next: (data) => this.track = data,
          error: (err) => console.error('Error:', err)
        });
      }
    });

    this.trackService.getAllTracks().subscribe({
      next: (data) => this.tracks = data as any[],
      error: (err) => console.error('Error:', err)
    });
  }
}
