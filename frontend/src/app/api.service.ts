import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Project, SitePayload } from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  site(): Observable<SitePayload> {
    return this.http.get<SitePayload>(`${this.base}/api/site`);
  }

  projects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.base}/api/projects`);
  }

  sendContact(body: { name: string; email: string; message: string }) {
    return this.http.post<{ ok: boolean; needsActivation?: boolean; emailedTo?: string }>(
      `${this.base}/api/contact`,
      body
    );
  }
}
