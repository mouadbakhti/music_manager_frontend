import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TrackService } from '../../../services/track.service';
import { Track } from '../../../models/track.model';

@Component({
  selector: 'app-track-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './track-menu.component.html',
  styleUrl: './track-menu.component.css'
})
export class TrackMenuComponent {

  allTracks: Track[] = [];
  tracks: Track[] = [];
  searchQuery: string = '';

  constructor(private trackService: TrackService) { }

  onSearchSubmit(event: Event) {
    event.preventDefault(); // Prevent page reload
    this.trackService.searchQuery$.next(this.searchQuery);
  }
}
