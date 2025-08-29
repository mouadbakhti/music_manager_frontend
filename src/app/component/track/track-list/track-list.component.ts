import { Component } from '@angular/core';
import { TrackService } from '../../../services/track.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Track } from '../../../models/track.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-track-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent {

  track: any;
  tracks: any[] = [];
  isModalOpen = false;
  editingTrack: Track = {} as Track;

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

  deleteTrack(id: number) {
    this.trackService.deleteTrackById(id).subscribe({
      next: () => this.tracks = this.tracks.filter(track => track.id !== id),
      error: (err) => console.error('Error:', err)
    });
  }

  openEditModal(track: Track) {
    this.editingTrack = { ...track };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingTrack = {} as Track;
  }

  updateTrack(id: number) {
    this.trackService.updateTrackById(id, this.editingTrack).subscribe({
      next: (updatedTrack) => {
        // update local list immutably
        this.tracks = this.tracks.map(t => t.id === id ? updatedTrack : t);
        this.closeModal();
      },
      error: (err) => console.error('Error:', err)
    });
  }
}
