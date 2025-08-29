import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-track-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './track-menu.component.html',
  styleUrl: './track-menu.component.css'
})
export class TrackMenuComponent {

}
