import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrackService } from '../../../services/track.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
  successMessage = '';

  constructor(private trackService: TrackService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.newTrack = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      duration: [null, [Validators.required, Validators.min(1)]], // Duration must be positive
      coverUrl: ['']
    });
  }

  addNewTrack() {
    if (this.newTrack.invalid) {
      this.newTrack.markAllAsTouched(); // Show validation errors
      return;
    }

    this.trackService.addTrack(this.newTrack.value).subscribe({
      next: () => {
        this.successMessage = 'Track added successfully!';
        this.newTrack.reset();
        this.router.navigate(['/track/list']);

      },
      error: (err) => {
        this.successMessage = '';
        // handle error
      }
    });
  }
}
