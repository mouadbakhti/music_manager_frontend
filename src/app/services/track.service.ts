import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TrackService {
  private localUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { };

  getTrackById(_id: any) {
    return this.http.get(`${this.localUrl}/api/track/${_id}`, { responseType: 'json' });
  }

  getAllTracks() {
    return this.http.get(`${this.localUrl}/api/tracks`, { responseType: 'json' });
  }

  addTrack(track: any) {
    return this.http.post(`${this.localUrl}/api/track`, track, { responseType: 'json' });
  }

  deleteTrackById(id: number) {
    return this.http.delete(`${this.localUrl}/api/track/${id}`, { responseType: 'json' });
  }

  updateTrackById(id: number, track: any) {
    return this.http.put(`${this.localUrl}/api/track/${id}`, track, { responseType: 'json' });
  }

}


