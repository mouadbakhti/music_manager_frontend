import { Component } from '@angular/core';
import { TrackService } from '../../../services/track.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  trackEditComponent: any;

  constructor(
    private trackService: TrackService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit() {
    // Show success message if passed from navigation
    if (history.state && history.state.successMessage) {
      this.successMessage = history.state.successMessage;
      setTimeout(() => this.successMessage = '', 2500);

      // Clear the message so it doesn't persist on refresh
      history.replaceState({}, document.title);
    }

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
    this.trackService.deleteTrackById(id).subscribe({
      next: () => {
        this.tracks = this.tracks.filter(track => track.id !== id);
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

  openDeleteModal(track: any) {
    this.trackToDelete = track;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.trackToDelete) {
      this.deleteTrack(this.trackToDelete.id);
    }
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.trackToDelete = null;
  }

  editTrack(track: any) {
    this.router.navigate(['/track/edit', track.id]);
  }
}
