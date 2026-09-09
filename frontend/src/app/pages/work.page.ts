import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ApiService } from '../api.service';
import { ProjectCardComponent } from '../project-card.component';

@Component({
  selector: 'app-work',
  imports: [AsyncPipe, ProjectCardComponent],
  templateUrl: './work.page.html',
})
export class WorkPage {
  projects$ = inject(ApiService).projects();
}
