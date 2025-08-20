import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})

export class TrackService {
  private localUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { };

  getTrackById(_id: any) {
    return this.http.get(`${this.localUrl}/api/track/${_id}`, { responseType: 'json' });
  }

}


