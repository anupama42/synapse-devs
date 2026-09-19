import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ApiService } from '../api.service';
import { LoadingSpinnerComponent } from '../loading-spinner.component';
import { ProjectCardComponent } from '../project-card.component';

@Component({
  selector: 'app-work',
  imports: [AsyncPipe, ProjectCardComponent, LoadingSpinnerComponent],
  templateUrl: './work.page.html',
  styleUrl: './work.page.scss',
})
export class WorkPage {
  projects$ = inject(ApiService).projects();
}
