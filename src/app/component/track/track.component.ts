import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackService } from '../../services/track.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-track',
  imports: [JsonPipe],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent {
  track: any;
  id = 1; 

  constructor(private trackService: TrackService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.trackService.getTrackById(this.id).subscribe({
      next: (data) => this.track = data,
      error: (err) => console.error('Error:', err)
    });
  }

}
