import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrackService } from '../../../services/track.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-track-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './track-add.component.html',
  styleUrl: './track-add.component.css'
})
export class TrackAddComponent {
  track: any;
  tracks: any[] = [];
  newTrack: any;

  constructor(private trackService: TrackService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.newTrack = this.fb.group({
      id: [],
      title: [],
      artist: [],
      duration: []
    });
  }

  addNewTrack() {

    this.trackService.addTrack(this.newTrack.value).subscribe({
      next: (data) => {
        console.log('Track added:', data);
        this.trackService.getAllTracks().subscribe({
          next: (tracks) => this.tracks = tracks as any[]
        });
      },
      error: (err) => console.error('Error:', err)
    });
  }
}
