import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { combineLatest, map } from 'rxjs';
import { ApiService } from '../api.service';
import { LoadingSpinnerComponent } from '../loading-spinner.component';
import { ProjectCardComponent } from '../project-card.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AsyncPipe, ProjectCardComponent, LoadingSpinnerComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  private api = inject(ApiService);
  vm$ = combineLatest({
    data: this.api.site(),
    featured: this.api.projects().pipe(map((list) => list.slice(0, 2))),
  });
}
