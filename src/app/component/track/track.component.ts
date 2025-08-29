import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TrackService } from '../../services/track.service';
import { CommonModule } from '@angular/common';
import { TrackMenuComponent } from './track-menu/track-menu.component';

@Component({
  selector: 'app-track',
  imports: [CommonModule, RouterOutlet, TrackMenuComponent],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent {

  constructor(private trackService: TrackService, private route: ActivatedRoute) { }

}
