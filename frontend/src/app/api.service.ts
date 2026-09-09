import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, SitePayload } from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  site(): Observable<SitePayload> {
    return this.http.get<SitePayload>('/api/site');
  }

  projects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/projects');
  }

  sendContact(body: { name: string; email: string; message: string }) {
    return this.http.post<{ ok: boolean; needsActivation?: boolean; emailedTo?: string }>('/api/contact', body);
  }
}
