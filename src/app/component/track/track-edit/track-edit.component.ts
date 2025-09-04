import { Component, OnInit } from '@angular/core';
import { TrackService } from '../../../services/track.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './track-edit.component.html',
  styleUrl: './track-edit.component.css'
})
export class TrackEditComponent implements OnInit {
  editingTrack: any;
  tracks: any[] = [];
  track: any;
  successMessage: string = '';

  constructor(private trackService: TrackService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.editingTrack = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      duration: [null, [Validators.required, Validators.min(1)]],
      coverUrl: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.trackService.getTrackById(id).subscribe({
          next: (track) => {
            this.editingTrack.patchValue(track);
          },
          error: (err) => console.error('Error:', err)
        });
      }
    });
  }

  updateTrack() {
    if (this.editingTrack.invalid) return;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.trackService.updateTrackById(id, this.editingTrack.value).subscribe({
      next: () => {
        this.successMessage = 'Track updated successfully!';
        setTimeout(() => this.successMessage = '', 2500);
        this.editingTrack.reset();
        this.router.navigate(['/track/list'], {
          state: { successMessage: 'Track updated successfully!' }
        });
      },
      error: (err) => console.error('Error:', err)
    });
  }
}
