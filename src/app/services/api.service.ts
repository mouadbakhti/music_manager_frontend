import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private localUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getHelloWorld() {
    return this.http.get(`${this.localUrl}/hello`, {responseType: 'text'});
  }
}
