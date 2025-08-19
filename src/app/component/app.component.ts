import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../services/api.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  message = '';
  title = 'music-manager';

  constructor(private apiService: ApiService) { } 
  ngOnInit() {
    this.apiService.getHelloWorld().subscribe(
      (data) => this.message = data
    );
  }
}
