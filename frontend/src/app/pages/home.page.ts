import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ApiService } from '../api.service';
import { ProjectCardComponent } from '../project-card.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AsyncPipe, ProjectCardComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  private api = inject(ApiService);
  site$ = this.api.site();
  featured$ = this.api.projects().pipe(map((list) => list.slice(0, 2)));
}
