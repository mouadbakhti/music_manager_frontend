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
  allTracks: any[] = []; 
  isModalOpen = false;
  editingTrack: Track = {} as Track;
  successMessage = ''; // Add this line
  showDeleteModal = false;
  trackToDelete: any = null;

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
      next: (data) => {
        this.tracks = data as any[];
        this.allTracks = data as any[]; // Add this line
      },
      error: (err) => console.error('Error:', err)
    });

    this.trackService.searchQuery$.subscribe(query => {
      this.filterTracks(query);
    });
  }

  filterTracks(query: string) {
    this.tracks = this.allTracks.filter(track =>
      track.title.toLowerCase().includes(query.trim().toLowerCase()) ||
      track.artist.toLowerCase().includes(query.trim().toLowerCase())
    );
  }

  deleteTrack(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this track?');
    if (!confirmed) return;

    this.trackService.deleteTrackById(id).subscribe({
      next: () => {
        this.tracks = this.tracks.filter(track => track.id !== id);
        this.successMessage = 'Track deleted successfully!';
        setTimeout(() => this.successMessage = '', 2500); // Hide after 2.5s
      },
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

  openDeleteModal(track: any) {
    this.trackToDelete = track;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    this.trackService.deleteTrackById(this.trackToDelete.id).subscribe({
      next: () => {
        this.tracks = this.tracks.filter(t => t.id !== this.trackToDelete.id);
        this.successMessage = 'Track deleted successfully!';
        setTimeout(() => this.successMessage = '', 2500);
        this.showDeleteModal = false;
        this.trackToDelete = null;
      },
      error: (err) => {
        this.showDeleteModal = false;
        this.trackToDelete = null;
      }
    });
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.trackToDelete = null;
  }
}
